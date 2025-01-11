import {web} from "./application/web.js";
import {logger} from "./application/logger.js";

web.listen(300, ()=>{
    logger.info("App Start");
});