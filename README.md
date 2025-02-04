## Run app

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

You can also test it online [HERE](https://angular-products.netlify.app).

## Technologies used

- Angular with TS and SCSS

## DEV NOTES (update later)

- I implemented the UI using SCSS without relying on additional libraries due to its simplicity. The only tool I added was Prettier for code formatting.
- Components leverage lazy loading to enhance project scalability.
- The favorites list is saved locally and remains after the page is refreshed.
- The application consists of two pages: product list and favorites.
- I have created some global components:
  - Spinner (simple but useful)
  - Product card: main list and favorites share the same style so I thought it was a good idea to not repeat any code and get this from a main component
- I checked the API response in order to define a model for the different objects.
- There was no design to follow so I applied a simple but at the same time responsive and accessible design. Since there is a big list of products (even more for mobile due to the reduced screen), I applied a sticky header.
- For the modal, I created a simple gallery with the array of images.
- I have created 2 different services: one for the products and another one to handle the shared methods (favorites and the modal logic).
- Deployed to "[production](https://angular-products.netlify.app)".

## Thinks to improve

There are some areas where the project could be improved if we had more time. The changes I made were made with scalability in mind, but there are some additional things we could do to improve the UX:

- Pagination: the list of products could be paginated while the user scrolls. This would require some changes to the API as well.
- Improve global UI: there was no initial design for this project, but some additional UI elements could improve the user experience, such as a skeleton loading for the products, ordering by rating/price, etc.
- Testing: while this wasn't a requirement, unit testing and BDD would be necessary if the project were to grow.
