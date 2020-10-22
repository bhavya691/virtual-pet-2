//Create variables here
var dog  , database , foodS , foodStock;
var feedPet , addFood;
var fedTime,lastFed;
var foodObj;
var dog1 , dog2;

function preload()
{
  //load images here
  dog1 = loadImage("Dog.png");
  dog2 = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1300, 600);
  
  dog = createSprite(1100,340,20,20);
  dog.addImage(dog1);
  dog.scale = 0.2;

  foodStock = database.ref('foodStock');
  foodStock.on("value",readStock);

  foodObj = new Food();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  addFood = createButton("add the food");
  addFood.position(1000,200);
  
  addFood.mousePressed(function addFoods(){
    foodS++;
    database.ref('/').update({
      foodStock:foodS
    })
  })

  feedPet = createButton("feed the dog");
  feedPet.position(900,200);
  feedPet.mousePressed(feedDog);
}


function draw() {  
  background(46,139,87);

  foodObj.display();
  
 fill(255,255,205);
textSize(15);
if(lastFed>=12){
  text("Last Feed : " + lastFed%12 + "PM" , 500,20);
}

  else if(lastFed === 0){
    text("Last Feed : 12 AM" , 500,20);
  }

  else{
    text("Last Feed : " +lastFed + "AM" , 500,20);
  }
  drawSprites();
  //add styles here
  
  
}

function readStock(data){
  foodStock = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }

  else{
    x=x-1;
  }


  database.ref('/').update({
    food:x
  })
}

function addFoods(foodS){
  foodS++;
  database.ref('/').update({
    foodStock:foodS
  })
}

function feedDog(){
  dog.addImage(dog2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    foodStock:foodObj.getFoodStock,
    FeedTime:hour()
  })
}

