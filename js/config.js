// ===== LEO TATTOO — settings (see README) =====
window.LEO_CONFIG = {
  // URL of the Cloudflare Worker that forwards bookings to Leo's Telegram
  // (see worker/README). Leave empty and the form asks visitors to message Leo directly.
  bookingEndpoint: "https://leo-booking.leo-tattoo-uz.workers.dev/",
  telegram: "kaishi_tattoo",          // Leo's Telegram username (without @)
  ownerEmail: "leo.tattoo.uz@gmail.com",
  timezone: "Asia/Tashkent"
};
