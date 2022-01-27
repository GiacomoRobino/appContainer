export class Series{
    public items = [
    [{"name": "Milk", "price": 3},
    {"name": "Egg", "price": 40}],
    {"name": "Grocery", "price": 140},
    {"name": "Salmon", "price": 30},
    {"name": "Coffee", "price": 20},
    {"name": "Cake", "price": 100},
    {"name": "Tea", "price": 10},
    {"name": "Bread", "price": 50},
    {"name": "Chicken", "price": 60},
    {"name": "Fish", "price": 80},
    {"name": "Soup", "price": 20},
    {"name": "Candy", "price": 2},
    {"name": "Juice", "price": 5},
    {"name": "Chips", "price": 10},
    {"name": "Soda", "price": 15},
    {"name": "Chips", "price": 10},
    {"name": "Soda", "price": 15}

]
    getSeries(){
        let result : any [] = []
        for(let i = 0; i < 2; i++){
        result.push(this.items.filter((element, index) => Math.random() > 0.5));
        }
        
        return result;
    }
};