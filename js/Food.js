class Food{
    constructor(){
       
        this.foodStock = 20;
        this.image = loadImage("Milk.png");
    }
    display(){
        var x =80 , y=200;
        imageMode(CENTER);
      
        if(foodStock!==0){
            for(var i =0; i<this.foodStock ; i++){
                if(i%10===0){
                    x = 20;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }
        getFoodStock(){
            var foodStockRef = database.ref('foodStock');
            foodStockRef.on("value",function(data){
            foodStock = data.val();
            })
        }

        updateFoodStock(count){
            database.ref('/').update({
            foodStock:count
            })
        }
    
}