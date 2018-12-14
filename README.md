## Open Food Trucks (CLI program) 
A Node.js command line program using axios and inquirer.

## Setup
- Make sure you have Node.js installed locally.

```shell
git clone https://github.com/Israel-Gonzalez/open-food-trucks.git
cd open-food-trucks
npm install
node app.js getFoodTrucks
```

## Usage
First 10 food trucks that are currently open will be logged after initially running program. You will be prompted whether or not you want to see more. To see next 10 open food trucks simply type `yes` otherwise you can exit program by typing `no`.

## Details
Food truck details include `name`, `address`, `open time`, and `close time` alphabetically ordered. 