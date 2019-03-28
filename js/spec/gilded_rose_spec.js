describe("GildedRose", function() {
  var items;

  beforeEach(function() {
    items = [];
  });

  it("Item is a function and has properties name, sell_in, quality", function() {
    expect(typeof Item).toEqual("function");
    const item = new Item(this.name, this.sell_in, this.quality);
    expect(item.name).toEqual(this.name);
    expect(item.sell_in).toEqual(this.sell_in);
    expect(item.quality).toEqual(this.quality);
  });

  it("update_quality is a function", function() {
    expect(typeof GildedRose.update_quality).toEqual("function");
  });

  it("should decrease quality and remaining sell_in days of regular items by 1", function() {
    items.push(new Item("+5 Dexterity Vest", 10, 20));
    items.push(new Item("Elixir of the Mongoose", 5, 7));

    GildedRose.update_quality(items);

    var expected = [{ sell_in: 9, quality: 19 }, { sell_in: 4, quality: 6 }];

    expected.forEach(function(test, i) {
      expect(items[i].quality).toBe(test.quality);
      expect(items[i].sell_in).toBe(test.sell_in);
    });
  });

  it("once sell_in date has passed quality goes down by two", function() {
    items.push(new Item("+5 Dexterity Vest", 0, 14));
    items.push(new Item("Elixir of the Mongoose", 0, 6));

    var expected = [{ sell_in: -1, quality: 12 }, { sell_in: -1, quality: 4 }];

    GildedRose.update_quality(items);

    expected.forEach(function(test, i) {
      expect(items[i].quality).toBe(test.quality);
      expect(items[i].sell_in).toBe(test.sell_in);
    });
  });

  it("quality of items should never be negative", function() {
    items.push(new Item("Elixir of the Mongoose", 0, 1));

    GildedRose.update_quality(items);

    expect(items[0].quality).toEqual(0);
  });

  it("quality of item is never more than 50", function() {
    items.push(new Item("Aged Brie", -2, 49));

    GildedRose.update_quality(items);

    expect(items[0].quality).toEqual(50);
  });

  it("should increase the quality by one for Aged Brie and Backstage Passes with 10 or more sell_in days", function() {
    items.push(new Item("Aged Brie", 11, 10));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    GildedRose.update_quality(items);

    var expected = [{ sell_in: 10, quality: 11 }, { sell_in: 19, quality: 31 }];

    expected.forEach(function(test, i) {
      expect(items[i].quality).toBe(test.quality);
      expect(items[i].sell_in).toBe(test.sell_in);
    });
  });

  it("Backstage passes should increase by 2 in quality when there are 10 days or less", function() {
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 7, 12));

    GildedRose.update_quality(items);

    expect(items[0].quality).toEqual(14);
    expect(items[0].sell_in).toEqual(6);
  });

  it("Backstage passes should increse by 3 in quality when there are 5 days or less", function() {
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 7));
    GildedRose.update_quality(items);

    expect(items[0].quality).toEqual(10);
    expect(items[0].sell_in).toEqual(4);
  });

  it("Backstage Passes should fall to 0 when sell by date is zero or less", function() {
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20));

    GildedRose.update_quality(items);

    expect(items[0].quality).toEqual(0);
  });

  it("Sulfuras should never decrease in quality or sell_in", function() {
    items.push(new Item("Sulfuras, Hand of Ragnaros", 5, 80));

    GildedRose.update_quality(items);

    expect(items[0].quality).toEqual(80);
    expect(items[0].sell_in).toEqual(5);
  });

  it("Conjured items degrade in quallity twice as fast as normal items", function() {
    items.push(new Item("Conjured Mana Cake", 3, 6));

    GildedRose.update_quality(items);

    expect(items[0].quality).toEqual(4);
    expect(items[0].sell_in).toEqual(2);
  });
});
