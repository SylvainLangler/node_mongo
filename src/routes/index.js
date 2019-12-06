import { productModel } from '../db/food'

export default (app) => {
    
    app.get('/products', async (req, res) => {
        try {
            const products = await productModel.find();
            res.status(200).json(products);
        } catch(err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': 'Error resquesting products'
            })
        }
    })

    app.get('/product/:bar_code', async (req, res) => {
        const barCode = req.params.bar_code

        try {
            const product = await productModel.findOne({ bar_code: barCode });
            if(product){
                res.status(200).json(product);
            }
            else{
                res.status(404).json({
                    'error':true,
                    'message': `No product with barCode ${barCode}`
                })
            }
        } catch(err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': `Error resquesting product ${barCode}`
            })
        }
    })

}