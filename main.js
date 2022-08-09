/**
 * Noah Manoucheri
 * 7/26/2022 11:31 AM
 * Controls the flow of page layout
 */
//npcs are objects with username, id: DM, and a array holding who has their contact
var npcs = [];
//layout dimensions
var dmns = {
  inventory: {},
  writing: {},
  chat: {},
  lockers: {},
};
var items = {
  giraffe: {
    name: "Crest of Dreven",
    thumbnail: "./media/woodenGiraffe/giraffe.png",
    model: "./media/woodenGiraffe/giraffe.stl",
    notes: "./media/woodenGiraffe/giraffe.txt",
    display: (s) => {
      s.ambientMaterial(207, 185, 151);
      s.ambientLight(200);
      s.noStroke();
      s.directionalLight(150, 100, 100, -100, -100, -100);
      s.model(items.giraffe.model);
    },
  },
  "sending stone": {
    name: "Sending Stone",
    thumbnail: "./media/sendingStone/sendingStone.png",
    model: null,
    notes: "./media/sendingStone/sendingStone.txt",
    chatLog: [],
    //logs are object stored in a array like this setup:
    //{ sender: senderName, senderID: senderID, recipient: recipient, recipientID: recipientID, msg: message }
    //holds all chat logs
    //whenever a new member is added they get added to this
    /** user: { 
       *        sender: username,
                senderID: id,
                recipient: recipient,
                recipientID: recipient,
                msg: note, }
      */
    //TODO: impliment chat functionality
    members: {}, //holds all members
  },
  decree: {
    name: "Message from Anglemount",
    thumbnail: "./media/messages/noteThumb.png",
    model: "./media/messages/note.stl",
    texture: "./media/messages/note.png",
    notes: "./media/messages/note.txt",
    display: (s) => {
      s.texture(items.decree.texture);
      s.ambientLight(200);
      s.noStroke();
      s.directionalLight(150, 100, 100, -100, -100, -100);
      s.model(items.decree.model);
    },
  },
  regendaleCrest: {
    name: "Crest of Regendale",
    thumbnail: "./media/sword/swordThumb.png",
    model: "./media/sword/sword.obj",
    texture: "./media/sword/sword.png",
    notes: "./media/sword/sword.txt",
    display: (s) => {
      s.texture(items.regendaleCrest.texture);
      s.ambientLight(200);
      s.noStroke();
      s.directionalLight(150, 100, 100, -100, -100, -100);
      s.model(items.regendaleCrest.model);
    },
  },
  vial: {
    name: "Crest of Hailsport",
    thumbnail: "./media/vial/vialThumb.png",
    model: "./media/vial/vial.obj",
    texture: "./media/vial/vial.png",
    notes: "./media/vial/vial.txt",
    display: (s) => {
      s.texture(items.vial.texture);
      s.ambientLight(200);
      s.noStroke();
      s.directionalLight(150, 100, 100, -100, -100, -100);
      s.model(items.vial.model);
    },
  },
  ear: {
    name: "Crest of Corendeck",
    thumbnail: "./media/ear/earThumb.png",
    model: "./media/ear/ear.obj",
    texture: "./media/ear/ear.png",
    notes: "./media/ear/ear.txt",
    display: (s) => {
      s.texture(items.ear.texture);
      s.ambientLight(200);
      s.noStroke();
      s.directionalLight(150, 100, 100, -100, -100, -100);
      s.model(items.ear.model);
    },
  },
  obelisk: {
    name: "Crest of Anglemount",
    thumbnail: "./media/obelisk/obeliskThumb.png",
    model: "./media/obelisk/obelisk.obj",
    notes: "./media/obelisk/obelisk.txt",
    display: (s) => {
      s.ambientLight(0);
      s.noStroke();
      s.directionalLight(150, 100, 100, -100, -100, -100);
      s.model(items.obelisk.model);
    },
  },
  journal: {
    name: "Old Journal",
    thumbnail: "./media/journal/journalThumb.png",
    model: "./media/journal/journal.obj",
    texture: "./media/journal/journal.png",
    notes: "./media/journal/journal.txt",
    display: (s) => {
      s.texture(items.journal.texture);
      s.ambientLight(200);
      s.noStroke();
      s.directionalLight(150, 100, 100, -100, -100, -100);
      s.model(items.journal.model);
    },
  },
};
var ui = [];
var lockerItems = [];
var shareRequests = [];
var playerInventories = {};

var layouts = (s) => {
  let windowPosition = []; //holds where on screen the canvas is
  let thumbnails = [];

  s.preload = () => {
    //giraffe
    lockerItems.push(s.loadImage(items.giraffe.thumbnail));
    items.giraffe.thumbnail = s.loadImage(items.giraffe.thumbnail);
    thumbnails.push(items.giraffe.thumbnail);
    items.giraffe.notes = s.loadStrings(items.giraffe.notes);
    //sending stone
    lockerItems.push(s.loadImage(items["sending stone"].thumbnail));
    items["sending stone"].thumbnail = s.loadImage(
      items["sending stone"].thumbnail
    );
    thumbnails.push(items["sending stone"].thumbnail);
    items["sending stone"].notes = s.loadStrings(items["sending stone"].notes);
    //Anglmount note
    lockerItems.push(s.loadImage(items.decree.thumbnail));
    items.decree.thumbnail = s.loadImage(items.decree.thumbnail);
    thumbnails.push(items.decree.thumbnail);
    items.decree.notes = s.loadStrings(items.decree.notes);
    //crest of anglemount
    lockerItems.push(s.loadImage(items.regendaleCrest.thumbnail));
    items.regendaleCrest.thumbnail = s.loadImage(items.regendaleCrest.thumbnail);
    thumbnails.push(items.regendaleCrest.thumbnail);
    items.regendaleCrest.notes = s.loadStrings(items.regendaleCrest.notes);
    //crest of hailsport
    lockerItems.push(s.loadImage(items.vial.thumbnail));
    items.vial.thumbnail = s.loadImage(items.vial.thumbnail);
    thumbnails.push(items.vial.thumbnail);
    items.vial.notes = s.loadStrings(items.vial.notes);
    //crest of corendeck
    lockerItems.push(s.loadImage(items.ear.thumbnail));
    items.ear.thumbnail = s.loadImage(items.ear.thumbnail);
    thumbnails.push(items.ear.thumbnail);
    items.ear.notes = s.loadStrings(items.ear.notes);
    //crest of anglemount
    lockerItems.push(s.loadImage(items.obelisk.thumbnail));
    items.obelisk.thumbnail = s.loadImage(items.obelisk.thumbnail);
    thumbnails.push(items.obelisk.thumbnail);
    items.obelisk.notes = s.loadStrings(items.obelisk.notes);
    //old journal
    lockerItems.push(s.loadImage(items.journal.thumbnail));
    items.journal.thumbnail = s.loadImage(items.journal.thumbnail);
    thumbnails.push(items.journal.thumbnail);
    items.journal.notes = s.loadStrings(items.journal.notes);
    //UI elements
    ui.push(s.loadImage("./media/ui/inventory.png"));
    ui.push(s.loadImage("./media/ui/notes.png"));
    ui.push(s.loadImage("./media/ui/chat.png"));
  };

  /**
   * addElements:
   * @param {string} item
   * @param {int} x
   * @param {int} y
   * @param {int} width
   * @param {int} height
   * adds dimensions for a UI elements to the layouts object
   */
  s.addElements = (item, x, y, width, height) => {
    dmns[item].x = x;
    dmns[item].y = y;
    dmns[item].width = width;
    dmns[item].height = height;
  };

  s.setup = () => {
    s.cnv = s.createCanvas(window.innerWidth * 0.99, window.innerHeight * 0.99);
    s.cnv.position(
      (window.innerWidth - s.width) / 2,
      (window.innerHeight - s.height) / 2
    );
    windowPosition.push(
      (window.innerWidth - s.width) / 2,
      (window.innerHeight - s.height) / 2
    );

    s.addElements(
      "inventory",
      windowPosition[0],
      windowPosition[1],
      s.width,
      ((s.width * 0.67) / 90) * 35
    );
    s.addElements(
      "writing",
      windowPosition[0],
      windowPosition[1] + ((s.width * 0.67) / 90) * 35,
      s.width * 0.27,
      s.height - ((s.width * 0.67) / 90) * 35
    );
    s.addElements(
      "chat",
      windowPosition[0] + s.width * 0.27,
      windowPosition[1] + ((s.width * 0.67) / 90) * 35,
      s.width * 0.27,
      s.height - ((s.width * 0.67) / 90) * 35
    );
    s.addElements(
      "lockers",
      windowPosition[0] + (s.width * 0.27 * 2),
      windowPosition[1] + ((s.width * 0.67) / 90) * 35,
      s.width * 0.46,
      s.height - ((s.width * 0.67) / 90) * 35
    );

    //resize thumbnails to fit boxes
    thumbnails.forEach((img) => {
      img = img.resize(
        dmns.inventory.height * 0.16,
        dmns.inventory.height * 0.16
      );
    });
    lockerItems.forEach((img) => {
      img = img.resize(
        dmns.inventory.height * 0.185,
        dmns.inventory.height * 0.185
      );
    });

    //turn on things
    createInventory();
    createNotes();
    createChat();
    createLocker();
  };

  s.draw = () => {
    s.stroke(255);
    s.noFill();
  };
};
var mainLayout = new p5(layouts, "layout");
