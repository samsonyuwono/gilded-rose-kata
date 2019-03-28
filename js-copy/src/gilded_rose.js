function Item(name, sell_in, quality) {
  //do not alter this
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function GildedRose() {
  var items = [];
}

//takes all items that aren't considered legendary
GildedRose.regularItems = function(item) {
  return (
    item.name != "Aged Brie" &&
    item.name != "Backstage passes to a TAFKAL80ETC concert" &&
    item.name != "Sulfuras, Hand of Ragnaros"
  );
};

//for item that only increase in quality
GildedRose.increaseDailyQuality = function(item) {
  this.increaseQuality(item);
  if (
    (item.name == "Aged Brie" ||
      item.name == "Backstage passes to a TAFKAL80ETC concert") &&
    item.sell_in < 11
  ) {
    this.increaseQuality(item);
    if (item.sell_in < 6) {
      this.increaseQuality(item);
    }
  }
};

//checks in item quality is 50
GildedRose.increaseQuality = function(item) {
  if (item.quality < 50) {
    item.quality++;
  }
};
//decreases quality of items more than 0
GildedRose.decreaseQuality = function(item) {
  if (item.quality > 0) {
    item.quality--;
  }
};

//items that are not sulfuras
GildedRose.allItemsNotSulfuras = function(item) {
  return item.name != "Sulfuras, Hand of Ragnaros";
};

//decreases sell_in date for everything except Sulfuras
GildedRose.decreaseSellIn = function(item) {
  item.sell_in--;
};

//an item is expired if it's sell_in is zero or less than
GildedRose.expired = function(item) {
  return item.sell_in < 0;
};

GildedRose.legendaryItems = function(item) {
  return (
    "Aged Brie" == item.name ||
    "Backstage passes to a TAFKAL80ETC concert" == item.name ||
    "Sulfuras, Hand of Ragnaros" == item.name
  );
};
//looks for conjured item
GildedRose.conjured = function(item) {
  return item.name == "Conjured Mana Cake";
};

GildedRose.zeroQuality = function(item) {
  item.quality = 0;
};
//start update_quality
//Code discussion will be over refactoring and cleaning up the code with the below functions
GildedRose.update_quality = function(items) {
  items.forEach(item => {
    if (this.regularItems(item)) {
      this.decreaseQuality(item);
    }
    if (!this.regularItems(item)) {
      this.increaseDailyQuality(item);
    }
    if (this.allItemsNotSulfuras(item)) {
      this.decreaseSellIn(item);
    }
    if (this.expired(item) && this.legendaryItems(item)) {
      this.zeroQuality(item);
    }
    if (
      (this.expired(item) && !this.legendaryItems(item)) ||
      this.conjured(item)
    ) {
      this.decreaseQuality(item);
    }
  });
  return items;
};
//end update_quality
