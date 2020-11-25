import { Router } from "express";
import ProductController from "../../../controllers/admin/products/blend.product";
import BlendProductController from "../../../controllers/products/blend.product";
import { AuthMiddleware, RoleMiddleware } from "../../../middleware/auth";
import { BlendProductMiddleware } from "../../../middleware/products";



const router = Router();

const { roleValidator , roleAccessValidator} = RoleMiddleware;
const { blendProduct, updateProductById, deleteBlendProductById } = ProductController;
const {fetchBlendProduct, blendProductResult } = BlendProductController
const { checkIfProductExist , validateProductResultFields} = BlendProductMiddleware;

router.post("/blend",
    roleValidator,
    checkIfProductExist,
    blendProduct
);

router.get("/blend",
    roleValidator,
    fetchBlendProduct
);


router.put("/blend/:id",
    roleValidator,
    checkIfProductExist,
    updateProductById
);

router.delete("/blend/:id",
    roleValidator,
    checkIfProductExist,
    deleteBlendProductById
);
router.post("/blend-result",
    roleAccessValidator(['super', 'staff']),
    validateProductResultFields,
   //checkIfProductExist,
     blendProductResult
);


export default router;
