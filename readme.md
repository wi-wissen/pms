# PMS

**Source code and install instructions are in English. Documentation and excersices currently are available in German only.**

PMS (Programm Exercise Management System) aims to help students to close the gap between block based programmiung (Scratch, Blockly) and real programming envoriments. This project helps teachers to prepare enviroments whare students learn how to programm.

Actuell JavaScript, CofeeScript, TypeScript and Python are supported.

Live Demo: https://ada7.de/

Help (only in German): https://ada7.de/docs/#/de-de/readme

Read more (only in German): https://blog.wi-wissen.de/



## Standing on the shoulders of [giants](docs/madewith.md)



## Install

#### Prerequisits

* PHP with [BC Math](https://secure.php.net/manual/en/book.bc.php) or [GMP](https://secure.php.net/manual/en/book.gmp.php) extension
* .htaccess support

### Steps

1. Copy project to your php server
2. Point a (sub-)domain to this folder
3. rename db/db.db.blanc to db/db.db
4. rename db/salt.php.blanc to db/salt.php
5. set random salts inside db/salt.php
6. change index.html to your needs



## Contributing

Thank you for considering contributing to the InstaHub! Create a pull request or contact [me](https://wi-wissen.de/contact.php).



## License

Mozilla Public License 2.0

Please check also licence of [used libarys and images](docs/madewith.md)