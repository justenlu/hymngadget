# How to try HymnGadget

HymnGadget is a prototype, not intended to be used in real life (or "in production"). This document tells how to see HymnGadget in action. To follow these instructions you need to be familiar with installing PHP software that uses MySQL.

HymnGadget needs a database. MySQL 5.5. was used for the purpose when HymnGadged was developed. The SQL statements that create the tables needed are in the file `hymngadget.sql`. You also have to create a database user and grant it read and write access to the database you created. 

To run server side code of HymnGadget, a server capable of running PHP is needed. When HymnGadget was developed, PHP 5.3 was used. In these instructions we use the built-in web server of PHP. If you use some other server, ensure that the server is configured to run `.php`-files instead of serving the source code of the files. This is important because the password of the database will be written to a `.php` file without any encryption.

To configure the database connection of HymnGadget, do as follows:

1. Go to the `gadget` folder.
2. Change the name of `config_db_connection.php.template` to `config_db_connection.php`.
3. Edit `config_db_connection.php` filling the url of your database server (`$dbhost`), the name of the database you created (`$dbname`), the username of the database user you created (`$dbuser`) and the password of that user (`$dbpass`).

To set the title for your instance of HymnGadget do as follows:

1. In the `gadget` folder, change the name of `config_ui.php.template` to `config_ui.php`.
2. Edit `config_ui.php` filling the name you want to appear as the title of the web page created by hymngadget.

In `gadget` folder, you can start HymnGadget in your localhost port 8000 using the built-in web server of PHP with the following command:

```
php -S localhost:8000
```

Now go to address http://localhost:8000 with your web browser. You should see the user interface of HymnGadget running in your browser.

In the user interface of HymnGadget there is no feature to add users or books. To add users, run the following statement in the database:

``` SQL
INSERT INTO user(username, first_name, last_name, password)
VALUES ('username', 'Firstname', 'Lastname', password('thepassword'));
```

To add books, run the following statement:

``` SQL
INSERT INTO book(name) values ('The name of the book');
```

Songs are added writing HymnCode in the editor of the application. There is no WYSIWYG editor.
