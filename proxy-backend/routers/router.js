const Router = require("express").Router;
const ProductController = require("../controllers/product-controller");
const OrgatizationController = require("../controllers/organization-controller");
const IndividualController = require("../controllers/individual-controller");
const ProxyBodyController = require("../controllers/proxy-body-controller");
const ProxyHeaderController = require("../controllers/proxy-header-controller");
const TechniqueController = require("../controllers/technique-controller");
const CargoController = require("../controllers/cargo-controller");
const PlaceController = require("../controllers/place-controller");
const WaybillHeaderController = require("../controllers/waybill-header-controller");
const MechanicsController = require("../controllers/mechanics-controller");
const WaybillBodyController = require("../controllers/waybill-body-controller");
const PodrazdController = require("../controllers/podrazd-controller.js");
const router = new Router();

router.get("/products", ProductController.getAllRecords);

router.post("/products", ProductController.createRecord);

router.put("/products", ProductController.updateRecord);

router.delete("/products/:id", ProductController.removeRecord);

router.get("/organizations", OrgatizationController.getAllRecords);

router.post("/organizations", OrgatizationController.createRecord);

router.put("/organizations", OrgatizationController.updateRecord);

router.delete("/organizations/:id", OrgatizationController.removeRecord);

router.get("/individuals", IndividualController.getAllRecords);

router.post("/individuals", IndividualController.createRecord);

router.put("/individuals", IndividualController.updateRecord);

router.delete("/individuals/:id", IndividualController.removeRecord);

//----------------------------------------------------

router.get("/podrazds", PodrazdController.getAllRecords);

router.post("/podrazds", PodrazdController.createRecord);

router.put("/podrazds", PodrazdController.updateRecord);

router.delete("/podrazds/:id", PodrazdController.removeRecord);

router.get("/proxy-bodies/:headerId", ProxyBodyController.getAllHeadersRecords);

router.post("/proxy-bodies", ProxyBodyController.createRecord);

router.put("/proxy-bodies", ProxyBodyController.updateRecord);

router.delete("/proxy-bodies/:id", ProxyBodyController.removeRecord);

router.get("/proxy-headers", ProxyHeaderController.getAllRecords);

router.get("/proxy-headers/:id", ProxyHeaderController.getOneRecord);

router.post("/proxy-headers", ProxyHeaderController.createRecord);

router.put("/proxy-headers", ProxyHeaderController.updateRecord);

router.delete("/proxy-headers/:id", ProxyHeaderController.removeRecord);

router.get("/technique", TechniqueController.getAllRecords);

router.post("/techique", TechniqueController.createRecord);

router.put("/technique", TechniqueController.updateRecord);

router.delete("/technique/:id", TechniqueController.removeRecord);

router.get("/cargo", CargoController.getAllRecords);

router.post("/cargo", CargoController.createRecord);

router.put("/cargo", CargoController.updateRecord);

router.delete("/cargo/:id", CargoController.removeRecord);
router.get("/place", PlaceController.getAllRecords);

router.post("/place", PlaceController.createRecord);

router.put("/place", PlaceController.updateRecord);

router.delete("/place/:id", PlaceController.removeRecord);

router.get("/waybillheader", WaybillHeaderController.getAllRecords);

router.get("/waybillheader/:id", WaybillHeaderController.getOneRecord);

router.post("/waybillheader", WaybillHeaderController.createRecord);

router.put("/waybillheader", WaybillHeaderController.updateRecord);

router.delete("/waybillheader/:id", WaybillHeaderController.removeRecord);

router.get("/mechanics", MechanicsController.getAllRecords);

router.post("/mechanics", MechanicsController.createRecord);

router.put("/mechanics", MechanicsController.updateRecord);

router.delete("/mechanics/:id", MechanicsController.removeRecord);
router.get(
  "/waybillbody/:headerId",
  WaybillBodyController.getAllHeadersRecords
);

router.post("/waybillbody", WaybillBodyController.createRecord);

router.put("/waybillbody", WaybillBodyController.updateRecord);

router.delete("/waybillbody/:id", WaybillBodyController.removeRecord);
module.exports = router;
