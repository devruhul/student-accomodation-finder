# StudentStay UK requirements

## Product goal

Help students in the UK find accommodation that fits their location, budget,
room type, travel distance, and move-in date. The first release is a responsive
web app with sample listings; it does not require an account.

## Users and core journeys

- A student can browse accommodation listings and narrow the results with
  filters.
- A student can open a listing to review its price, room type, location,
  distance from a university, availability date, and description.
- A student can save listings as favourites, revisit them, and remove them.

## Functional requirements

1. **Browse listings:** Show each listing's title, city, monthly price in GBP,
   room type, university distance, image, and short description.
2. **Filter listings:** Support a partial city search, maximum monthly price,
   room type, maximum distance from a university, and availability on or after
   a selected date. Filters combine, and changing one refreshes the results.
3. **View listing details:** Each result links to a detail page with the full
   listing information and a save/remove favourite action.
4. **Manage favourites:** Provide a favourites page. Persist saved listings in
   the current browser so they remain after a reload; allow removal from either
   the detail page or favourites page.
5. **Handle empty and unavailable states:** Show a loading state, a clear
   no-results message, and sample listings with an offline notice when the API
   cannot be reached.
6. **Backend API:** Provide `GET /api/health`, `GET /api/properties` with the
   filters above, and `GET /api/properties/:id` with a 404 for an unknown id.

## Quality requirements

- The app must work in current desktop and mobile browsers and expose labelled
  controls and useful image alt text.
- Prices must be displayed in GBP and distances in kilometres.
- The frontend must be runnable locally without PostgreSQL by using sample
  listings when the API is offline.
- Local development must not require database credentials just to browse the
  sample listings.

## Acceptance checklist

- [x] A student can filter by each supported field and combine filters.
- [x] A student can clear all filters and return to the default results.
- [x] A student can open a listing and save or remove it as a favourite.
- [x] Favourites remain after a browser reload and can be removed from the
  favourites page.
- [x] Empty results and API-offline fallback are understandable.
- [x] The API health, list, and detail endpoints are implemented.

## Not in the first release

Student accounts, landlord listing management, booking/payment, reviews,
university-specific distance calculations, and production listing feeds are
out of scope until separately specified.
