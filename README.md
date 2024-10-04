<p align='center'>
  <img src='https://github.com/user-attachments/assets/fb666c86-d9b6-47b5-9455-3f0193313a73' width='300px'/>
</p>
<hr/>
Introducing a cutting-edge e-commerce platform built with Next.js, designed to support multiple stores effortlessly.

<h2 id="project-overview">🛠 Project Overview</h2>
<p>Pria e-commerce platform leverages the following key technologies:</p>
<h3>🚀 Next.js (v14.2.4)</h3>
<ul>
  <li>Chosen for its server-side rendering capabilities, improving SEO and initial load times.</li>
  <li>Provides an excellent developer experience with features like API routes and file-based routing.</li>
</ul>
<h3>⚛️ React (v18)</h3>
<ul>
  <li>The core library for building our user interface, offering a component-based architecture for maintainable and reusable code.</li>
</ul>
<h3>🏷️ TypeScript</h3>
<ul>
  <li>Adds static typing to JavaScript, enhancing code quality and developer productivity through better tooling and error detection.</li>
</ul>
<h3>🎨 Tailwind CSS</h3>
<ul>
  <li>Utilized for its utility-first approach, enabling rapid UI development and easy customization.</li>
  <li>Provides a consistent design system across the application.</li>
</ul>

<h3>🐬 MySQL</h3>
<ul>
  <li>Open-source relational database management system known for reliability and performance.</li>
  <li>Provides ACID-compliant data storage and powerful SQL querying capabilities.</li>
  <li>Offers excellent scalability, suitable for both small applications and large enterprise systems.</li>
</ul>
<h3>🗄️ Prisma</h3>
<ul>
  <li>My ORM of choice, offering type-safe database access and easy migration management.</li>
  <li>Simplifies database operations and provides excellent TypeScript integration.</li>
</ul>
<h3>🔐 NextAuth.js (v5 beta)</h3>
<ul>
  <li>Handles authentication, supporting various providers and offering a flexible, secure solution for user management.</li>
  <li>Utilizes JWT (JSON Web Tokens) for session management instead of database sessions, providing a stateless authentication mechanism that's scalable and efficient.</li>
  <li>Supports OAuth authentication, allowing users to log in with their Google and GitHub accounts:
    <ul>
      <li>Google OAuth integration enables users to sign in using their Google credentials, leveraging the security and convenience of their existing Google account.</li>
      <li>GitHub OAuth support allows developers to log in with their GitHub accounts, which is particularly useful for developer-focused applications or open-source projects.</li>
    </ul>
  </li>
  <li>Simplifies the implementation of social login features, enhancing user experience by providing multiple login options.</li>
  <li>Handles the complexities of OAuth flow, including token exchange and profile information retrieval, making it easier for developers to implement secure authentication.</li>
</ul>
<h3>💳 Stripe</h3>
<ul>
  <li>Integrated for secure and reliable payment processing, supporting multiple payment methods.</li>
</ul>
<h3>🔌 Supabase</h3>
<ul>
  <li>Used for file storage.</li>
</ul>
<h3>🧩 Shadcn UI</h3>
<ul>
  <li>Provides unstyled, accessible UI components that i've customized to fit my design needs.</li>
  <li>Ensures a high level of accessibility compliance out of the box.</li>
  <li>Note: Shadcn UI components have been selectively implemented in specific areas of the application to enhance usability and maintain design standards.</li>
</ul>
<h3>✅ Zod</h3>
<ul>
  <li>Used for runtime type checking and data validation. Increases the robustness of the application.</li>
</ul>
<h3>🔄 Context API</h3>
<ul>
<li>
  The Context API was used to manage data sharing between components in a simple and effective way. This eliminated the problem of prop drilling, enhancing the application's performance.
</li>
</ul>

<p>This tech stack was carefully chosen to provide a balance of performance, developer experience, and feature richness. It allows us to build a scalable, maintainable, and user-friendly e-commerce platform that can easily adapt to changing business needs and technological advancements.</p>
<h2 id="features">✨ Features</h2>

<div>

<h3>User</h3>      
A user can browse products, manage their account, add items to their shopping basket, complete purchases and track orders.

&thinsp;

| Feature                          | Description                                                                                                                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width=200/>                 | <img width=770/>                                                                                                                                                                                                                       |
| Home                             | <p align='center'><img src='https://github.com/user-attachments/assets/ed540a68-b95f-47ad-9127-4933080ae1f0' width='70%'/></p>                                                                                                         |
| Product List                     | <p align='center'><img src='https://github.com/user-attachments/assets/12f8be8e-1f6a-4de5-aff1-7e12a567d4cf' width='70%'/></p>                                                                                                         |
| Product Show                     | <p align='center'><img src='https://github.com/user-attachments/assets/ae8a6c88-fa38-4b4b-9eed-fd6dd3b3502e' width='70%'/><img src='https://github.com/user-attachments/assets/0eea051a-d9f7-4e32-b727-0f4e29e29f5e' width='70%'/></p> |
| Unlimited Nested Categories      | <p align='center'><img src='https://github.com/user-attachments/assets/11bfdba9-80c8-480e-ad55-ead511fc9f21' width='70%'/></p>                                                                                                         |
| Search                           | <p align='center'><img src='https://github.com/user-attachments/assets/7490f33b-de36-4377-99c9-0926cad2c420' width='70%'/></p>                                                                                                         |
| Login                            | <p align='center'><img src='https://github.com/user-attachments/assets/7b4feb26-0444-4e7a-abb4-a65462b58d07' width='70%'/></p>                                                                                                         |
| Register                         | <p align='center'><img src='https://github.com/user-attachments/assets/5a8d7bb6-21cd-4458-b3e5-ebfb53ec6ee5' width='70%'/></p>                                                                                                         |
| Checkout with Stripe integration | <p align='center'><img src='https://github.com/user-attachments/assets/52914863-fc4a-469a-bf89-bb7dd5143e73' width='70%'/></p>                                                                                                         |
| Cart                             | <p align='center'><img src='https://github.com/user-attachments/assets/ca12a615-e3e8-4866-a8a5-b09e7f1589fc' width='70%'/></p>                                                                                                         |
| Favorites                        | <p align='center'><img src='https://github.com/user-attachments/assets/2f50b343-036c-4c21-8c88-2ee6b676c0be' width='70%'/></p>                                                                                                         |
| Store Page                       | <p align='center'><img src='https://github.com/user-attachments/assets/dab66ce6-8ba1-418b-8aa8-6e02b61ed8ae' width='70%'/></p>                                                                                                         |
| My Orders                        | <p align='center'><img src='https://github.com/user-attachments/assets/860c08f9-28df-4873-845f-ac8572c0b312' width='70%'/></p>                                                                                                         |
| My Reviews                       | <p align='center'><img src='https://github.com/user-attachments/assets/acdfa7ba-4bb3-4949-8834-92991f0a0f11' width='70%'/></p>                                                                                                         |
| Account Settings                 | <p align='center'><img src='https://github.com/user-attachments/assets/9736c84d-5009-49eb-b039-a0ca86bd1264' width='70%'/></p>                                                                                                         |

&thinsp;

<h3>Store Owner</h3>

As a store owner, you can manage product additions, updates and deletions; track inventory; set pricing and promotions; manage orders; and view customer information.

&thinsp;

| Feature               | Description                                                                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img width=200/>      | <img width=770/>                                                                                                                                                                                                                                             |
| Store Owner Dashboard | <p align='center'><img src='https://github.com/user-attachments/assets/2a67ff1d-7019-4ee0-b226-7374ccec2221' width='70%'/></p>                                                                                                                               |
| Home                  | <p align='center'><img src='https://github.com/user-attachments/assets/3e7e0f8e-68cd-4310-9104-90ee102b29b4' width='70%'/></p>                                                                                                                               |
| Products              | <p align='center'><img src='https://github.com/user-attachments/assets/fc9e4453-30c1-46cc-a444-ba68e6a108aa' width='70%'/></p><p align='center'><img src='https://github.com/user-attachments/assets/ac866820-d03e-4128-9039-b17b56d68317' width='70%'/></p> |
| Orders                | <p align='center'><img src='https://github.com/user-attachments/assets/4146f2bc-ab5d-404e-820b-8feaec15c969' width='70%'/></p>                                                                                                                               |
| Discounts             | <p align='center'><img src='https://github.com/user-attachments/assets/7eaff407-f887-4b48-a092-f71f8b39813c' width='70%'/><img src='https://github.com/user-attachments/assets/d5199e2b-a1c9-4342-9f1d-db8bc65f4695' width='70%'/></p>                       |
| Carriers              | <p align='center'><img src='https://github.com/user-attachments/assets/1f85a66c-e994-438d-8c48-71f46e6e6e38' width='70%'/></p>                                                                                                                               |

&thinsp;

<h3>Admin</h3>

Admin can manage product categories, toggle store status (active/inactive), and oversee user accounts for store owners, staff, and other authorized personnel.

&thinsp;

</div>

<div>
  
<h2>📘 Usage</h2>
1. Clone the repository

```
git clone https://github.com/papeiron/Next.js-Ecommerce-App.git
```

2. Install project dependencies using npm or yarn:

```
npm i
```

or

```
yarn
```

3. Create .env file (The following is a sample .env file)

```
DATABASE_URL=
AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
```

4. Install Mysql and create a database

```
CREATE DATABASE 'databasename'
```

5. Run Project

```
npm run dev
```

<h2>License</h2>
<a href='https://github.com/papeiron/Next.js-Ecommerce-App/tree/main?tab=MIT-1-ov-file'>MIT</a>

</div>

<hr/>
