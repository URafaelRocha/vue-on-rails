# vue-on-rails

## Description

This is a project that combines Vue.js with Ruby on Rails to create a powerful and modern web application.

## Getting Started

To get started, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone git@github.com:URafaelRocha/vue-on-rails.git
```

2. Navigate to the project directory:

```bash
cd vue-on-rails
```

3. Ensure you have Node.js installed on your machine. If you prefer, you can use `nvm` to manage your Node.js versions. For this project, version `v18.20.2` is recommended. You can use the following command to switch to that version:

```bash
nvm use v18.20.2
```

4. Create database, run migrations and seeds

```bash
rails db:create db:migrate db:seed
```

5. Apply bundle install and npm install:

```bash
bundle exec vite upgrade
```

6. Now you're ready to start the Rails server and begin development:

```bash
rails s
```

This will start the Rails server on the default port (`http://localhost:3000`). You can access this URL in your browser to view the application.

## Contributing

If you wish to contribute to this project, feel free to submit pull requests. We'll be happy to review your contributions!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
