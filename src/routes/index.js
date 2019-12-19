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
    });

    app.post('/product', async (req, res) => {
        try{
            const { name, brand, bar_code, grade, quantity, pictures, ingredients } = req.body;
            const request = new productModel({
                name, brand, bar_code, grade, quantity, pictures, ingredients
            });
            
            const inserted = await request.save();

            if(inserted && inserted._id){
                // insertion OK
                return res.json(inserted);
            }
            else{
                // insertion pas ok
                return res.status(500).json({
                    status: "fail",
                    message: "Le produit n'a pa pu être inséré"
                })
            }
        }
        catch(err){
            console.log(err.message);
            return res.status(500).json({
                error: true,
                message: "Le produit n'a pa pu être inséré"
            })
        }
    })

    app.get('/comments/:food_id', async (req, res) => {
        try {
            const food_id = req.params.id
            const product = await productModel.findOne({ id: food_id });
            if(product){
                res.status(200).json(product.comments);
            }
            else{
                res.status(404).json({
                    'error':true,
                    'message': `No product with id ${food_id}`
                })
            }
        
        } catch(err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': 'Error resquesting comments'
            })
        }
    });

    app.post('/comment/:food_id', async (req, res) => {
        try{
            // body
            const { id, date, title, text } = req.body;

            // new comment
            let comment = new Object({id: id, title: title, date: date, text: text});
    
            // récupération du produit
            const food_id = req.params.id
            const product = await productModel.findOne({ id: food_id });

            // ajout du commentaire
            product.comments.push(comment);
            const inserted = await product.save();
    
            if(inserted){
                // insertion OK
                return res.json(inserted);
            }
            else{
                // insertion pas ok
                return res.status(500).json({
                    status: "fail",
                    message: "Le produit n'a pa pu être inséré"
                })
            }
        }
        catch(err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': 'Error posting comment'
            })
        }
        
    })

}