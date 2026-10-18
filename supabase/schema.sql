-- Run once in Supabase > SQL Editor. Bookings are only reachable through the 2 functions below.
create table if not exists public.bookings(
  id bigint generated always as identity primary key,
  name text not null, phone text not null, contact text, email text,
  idea text not null default '', design text, lang text,
  day date not null, time text not null
    check (time in ('13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00')),
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz not null default now()
);
create unique index if not exists one_booking_per_slot on public.bookings(day,time) where status<>'cancelled';
alter table public.bookings enable row level security;
revoke all on public.bookings from anon, authenticated;

create or replace function public.get_taken_slots(p_from date,p_to date)
returns table(day date,"time" text) language sql security definer set search_path=public stable as $$
  select day,time from public.bookings where day between p_from and p_to and status<>'cancelled' $$;

create or replace function public.create_booking(p_name text,p_phone text,p_contact text,p_email text,
  p_idea text,p_design text,p_lang text,p_day date,p_time text)
returns json language plpgsql security definer set search_path=public as $$
declare t timestamp := now() at time zone 'Asia/Tashkent'; r bigint;
begin
  if length(trim(coalesce(p_name,'')))<2 or length(trim(coalesce(p_phone,'')))<5 then return json_build_object('ok',false,'error','invalid'); end if;
  if extract(dow from p_day) not between 0 and 4 or p_day>t::date+90 or (p_day+p_time::time)<=t then return json_build_object('ok',false,'error','invalid'); end if;
  if (select count(*) from bookings where phone=trim(p_phone) and status='pending' and day>=t::date)>=3 then return json_build_object('ok',false,'error','too_many'); end if;
  insert into bookings(name,phone,contact,email,idea,design,lang,day,time)
  values(left(trim(p_name),120),left(trim(p_phone),40),left(p_contact,80),left(p_email,254),left(coalesce(p_idea,''),1500),left(p_design,20),left(p_lang,5),p_day,p_time)
  returning id into r;
  return json_build_object('ok',true,'id',r);
exception when unique_violation then return json_build_object('ok',false,'error','taken');
end $$;
grant execute on function public.get_taken_slots(date,date), public.create_booking(text,text,text,text,text,text,text,date,text) to anon;
