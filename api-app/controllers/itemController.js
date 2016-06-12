/**
 * Created by Simachew on 07-Jun-16.
 */

var mongoose = require("mongoose");

/**
 * Mongoose model to represent item. Defined in ../models/item.js
 */
var ItemModel = require("../models/item");

/**
 * An object that defines methods to serve as controller for the
 * item entity.
 * @type {{}}
 */
var itemController = {};


/**
 * Gets all the items in the Item definition.
 * (From the item collection in the DB)
 */
function getItems() {
    ItemModel.find(function (err, items) {
        console.log("itemController.getItems(Item.find(err, items)): items:", items);
        if (err) {
            console.log("Error happened in itemController.getItems()");
            return err;
        }
        return items;
    });
};


/**
 * Finds the item by the given id, itemId and returns it if all goes well.
 * @param itemId The id of the item to be found.
 * @returns item object or error object.
 */
function getItem(itemId) {
    if (!itemId) {
        return {
            error: "Wrong call to a function",
            message: "Can't call itemController.getItem with out an id param",
        };
    }
    ItemModel.findById(itemId, function (err, item) {
        if (err) {
            return err;
        }
        return item;
    });
};


/**
 * Tries to save the given Item object to the DB.
 * @param item The Item object to be saved in to DB.
 * @returns Returns the newly saved Item if successful or an error if saving fails.
 */
function saveItem(item) {
    //todo: maybe check if the given item is a mongoose.Schema type.
    item.save(function (err) {
        if (err) {
            return err;
        }
        return {
            success: true,
            message: "Item created",
            item: item
        };
    });
};


/**
 * Finds the item by the given id, itemId, and updates the item with
 * the new parameters of the given item object, newItem.
 * @param itemId The id of the Item to be updated in the DB.
 * @param newItem The new contents of the Item in an item object.
 */
function updateItem(itemId, newItem) {
    ItemModel.findById(itemId, function (err, item) {
        if (err) {
            return err;
        }

        if (newItem.name) item.name = newItem.name;
        if (newItem.nickName) item.nickName = newItem.nickName;
        if (newItem.purpose) item.purpose = newItem.purpose;
        if (newItem.unit) item.unit = newItem.unit;
        if (newItem.availableSizes) item.avaisizes = newItem.availableSizes;
        if (newItem.isReparable) item.isReparable = newItem.isReparable;

        //todo: improve the message to this function's
       return saveItem(item);
    });

};


/**
 *
 * @param itemId
 */
function deleteItem(itemId) {
    /*
    Item.remove({_id: itemId}, function (err, item) {
        if (err){
            return err;
        }
        return {
            success: true,
            message: "Item removed",
            item: item
        };
    });
    */
    var item = ItemModel.findById(itemId,
    function (err, foundItem) {
        if(err){
            return err;
        }
    });

    item.isPast = flase;
    var result = saveItem(item);
    if(result.success){
        result.message = "Item removed";
        return result;
    } else {
        return result;
    }
};

itemController.saveItem = saveItem;
itemController.updateItem = updateItem;
itemController.deleteItem = deleteItem;
itemController.getItem = getItem;
itemController.getItems = getItems;

module.exports = itemController;