const ProductController = require("../../controller/product.controller")
const httpMocks = require('node-mocks-http')
const { Product } = require("../../models/index")

let req, res, next;

jest.mock('../../models/')

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
})

describe('ProductController.postProducts', () => {

    it('should return 200 ', async () => {
        Product.create.mockResolvedValue({
            name: "skop"
        })
        ProductController.postProducts(req, res);
        expect(res.statusCode).toBe(200);
    })
    it("should return errors", async () => {
        const errData = {
            status: "Fail",
            message: "Gagal mengambil data product"
        }

        const rejected = Promise.reject(errData)
        Product.findAll.mockResolvedValue(rejected)

        await ProductController.getProducts(req, res)
        expect(res.statusCode) === (503)
    })
})

describe('ProductController.getProducts', () => {
    beforeEach(() => {
        Product.findAll.mockResolvedValue({
            name: "ayam",
            price: 20000,
            quantity: 10,
        });
    })
    it('should return code 200', async () => {
        ProductController.getProducts(req, res);
        expect(res.statusCode).toBe(200);
    })

    it('should return array data', async () => {
        await ProductController.getProducts(req, res);

        expect(res).hasOwnProperty("data");
    })

    it('Should handle errors', async () => {
        const errorData = {
            status: "FAILED",
            message: "failed load products"
        };

        const rejected = Promise.reject(errorData);
        Product.findAll.mockResolvedValue(rejected);

        await ProductController.getProducts(req, res)
        expect(res.statusCode) === (503);

    })
})


describe('ProductController.getProductsSearch', () => {
    beforeEach(() => {
        Product.findOne.mockResolvedValue({
            firstName: "asis",
            lastName: "G",
            email: "asis@G.com"
        })
    })

    it('should return code 200', async () => {
        ProductController.getProductsSearch(req, res);
        expect(res.statusCode).toBe(200);
    })

    it('should return array data', async () => {
        await ProductController.getProductsSearch(req, res);

        expect(res).hasOwnProperty("data");
    })

    it('Should handle errors', async () => {
        const errorData = {
            status: "FAILED",
            message: "failed load products"
        };

        const rejected = Promise.reject(errorData);
        Product.findOne.mockResolvedValue(rejected);

        await ProductController.getProductsSearch(req, res)
        expect(res.statusCode) == (503);

    })
})