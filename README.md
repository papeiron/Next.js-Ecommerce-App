<p align='center'>
  <img src='https://github.com/user-attachments/assets/3b3b3e7c-a2f6-4870-abd3-e0d38199fda7' width='300px'/>
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
| Home                             | <p align='center'><img src='https://github.com/user-attachments/assets/bc1090dd-97af-4998-90c7-013364b094e3' width='70%'/><img src='https://github.com/user-attachments/assets/50627e8e-7590-421f-bc22-79c23431628e' width='70%'/></p>                                                                                                         |
| Product List                     | <p align='center'><img src='https://github.com/user-attachments/assets/53a1dcfb-ad3b-4f0e-85c3-c9d5453fea76' width='70%'/></p>                                                                                                         |
| Product Show                     | <p align='center'><img src='https://github.com/user-attachments/assets/b54bbe62-b680-4725-a590-b00e08919904' width='70%'/><img src='https://github.com/user-attachments/assets/ea4bb6ca-b387-4e61-8954-377cda8471b9' width='70%'/></p> |
| Unlimited Nested Categories      | <p align='center'><img src='https://github.com/user-attachments/assets/d6b6b0fd-b23d-4214-9624-610076120b20' width='70%'/></p>                                                                                                         |
| Search                           | <p align='center'><img src='https://github.com/user-attachments/assets/64512d63-f23a-4f90-9594-bb398f2a473b' width='70%'/><img src='https://github.com/user-attachments/assets/6dcc5de4-7253-4b5e-a4d2-a74e79595504' width='70%'/></p>                                                                                                         |
| Login                            | <p align='center'><img src='https://github.com/user-attachments/assets/1e5e9648-b377-4ff5-a4bf-dccd22558a20' width='70%'/></p>                                                                                                         |
| Register                         | <p align='center'><img src='https://github.com/user-attachments/assets/ce6b03dc-fc5e-4821-9039-204b9baf42e9' width='70%'/></p>                                                                                                         |
| Checkout with Stripe integration | <p align='center'><img src='https://github.com/user-attachments/assets/bd25de13-58fa-4015-abac-58086d99d551' width='70%'/></p>                                                                                                         |
| Cart                             | <p align='center'><img src='https://github.com/user-attachments/assets/194d0a5c-db8e-466f-b797-32945be37ce4' width='70%'/></p>                                                                                                         |
| Favorites                        | <p align='center'><img src='https://github.com/user-attachments/assets/c5f8bfbf-4e5b-4f4b-a808-47f3d30d710c' width='70%'/></p>                                                                                                         |
| Store Page                       | <p align='center'><img src='https://github.com/user-attachments/assets/8a7f7af5-6fa6-40ac-8178-a908abfee034' width='70%'/></p>                                                                                                         |
| My Orders                        | <p align='center'><img src='https://github.com/user-attachments/assets/72a6f4f7-be5d-425e-b065-3272cd186a65' width='70%'/></p>                                                                                                         |
| My Reviews                       | <p align='center'><img src='https://github.com/user-attachments/assets/afb79cfd-1bd3-4dc4-9367-d0242d459e41' width='70%'/></p>                                                                                                         |
| Account Settings                 | <p align='center'><img src='https://github.com/user-attachments/assets/55d8f8e3-a434-449e-b727-e44a3084bf8b' width='70%'/></p>                                                                                                         |

&thinsp;

<h3>Store Owner</h3>

As a store owner, you can manage product additions, updates and deletions; track inventory; set pricing and promotions; manage orders; and view customer information.

&thinsp;

| Feature               | Description                                                                                                                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Store Owner Dashboard  | <p align='center'><img src='https://github.com/user-attachments/assets/2a8b64e6-daba-4954-8f9f-954cd285d7e1' width='70%'/></p>                                                                                                                           |
| Products              | <p align='center'><img src='https://github.com/user-attachments/assets/f359322e-8a9f-42d8-997a-5854a8b7fd78' width='70%'/></p> <p align='center'><img src='https://github.com/user-attachments/assets/81e4ea58-2aae-40a8-ab70-ab000a86677b' width='70%'/></p> |
| Orders                | <p align='center'><img src='https://github.com/user-attachments/assets/2c737a4a-6806-49f2-a8cd-2dd0aebae191' width='70%'/></p>                                                                                                                           |
| Discounts             | <p align='center'><img src='https://github.com/user-attachments/assets/969e541c-68f6-4ee1-b462-1833debd91fb' width='70%'/></p>                                                                                                                       |
| Carriers              | <p align='center'><img src='https://github.com/user-attachments/assets/fa57c9fe-36e9-41f4-850f-47fb2cea06d0' width='70%'/></p>                                                                                                                       |


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
