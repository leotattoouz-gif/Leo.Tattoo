# ЛЕО Tattoo — website

Responsive tattoo artist website in Russian (default), English and Uzbek. The AI section and AI code are not included. Tattoo gallery, lightbox, animated ticker and appointment booking are included.

## Publish the static website

The site can be hosted on GitHub Pages, Netlify or another static host.

1. Create a new public or private GitHub repository and upload the **contents** of this folder (keep `index.html` at the repository root).
2. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
3. GitHub shows the public URL in the Pages settings after the first deployment. The URL depends on your GitHub username and repository, so it cannot be created in advance.

## Enable persistent online booking

Booking is intentionally unavailable until Supabase is configured. This avoids showing fictional free times or accepting requests that are not saved.

1. Create a Supabase project and run `supabase/schema.sql` once in its SQL Editor.
2. In **Project Settings → API**, copy the Project URL and `anon` public key into `js/config.js` as `supabaseUrl` and `supabaseAnonKey`. The anon key is designed for browser use; never put a `service_role` key in this static site.
3. Publish the site again. Free slots are now read from the shared database and refreshed every 30 seconds while the page is open. A database uniqueness rule prevents two customers from taking the same slot at once. Canceled reservations make that slot available again.
4. Leo can review requests in Supabase → **Table Editor → bookings** and change `status` to `confirmed` or `cancelled`.

Leo's contact email is `leo.tattoo.uz@gmail.com` and is shown as a mail link in the footer. To receive an email notification for a new request at that address, create a Web3Forms access key for the same email and set it in `js/config.js` as `web3formsKey`. The email includes the booking reference, name, phone, optional social contact and email, tattoo idea, chosen gallery design (if any), and appointment date and time. The site reports when an appointment is saved but its email alert could not be sent. Supabase remains the reservation record even if email notification is not configured.

## Site details to confirm before sharing

- Current hours: Sunday–Thursday, 13:00–22:00 in Asia/Tashkent; the 22:00 booking is a start time.
- Add or correct the studio location and contact links in `index.html` and `js/config.js`.
- Make sure you have permission to publish every image in `img/`.
- Russian is the default for new visitors. Visitors can switch to English or Uzbek; a previously saved language preference is retained if it is one of those three.
- Local preview needs Node.js 20+: run `node preview-server.mjs` and open `http://127.0.0.1:4176`.
