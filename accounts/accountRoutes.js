import express from 'express';
import Account from './accountModel';

const accountRoutes = express.Router();


accountRoutes.get('/', async (req, res) => {
    try {
      const accounts = await Account.find(req.query);
      res.status(200).json(accounts);
    } catch(error) {
      res.status(500).json({ error: "The accounts information could not be retrieved." });
    }
})

accountRoutes.get('/:id', async (req, res) => {
    const account= await Account.findById(req.params.id);

    try {
        if(account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({ message: `The account with the specified id:${req.params.id} does not exist.` })
        }
    } catch(error) {
        res.status(500).json({ error: "The account information could not be retrieved." })
    }
})

accountRoutes.post("/", (req, res) => {
    const { name, budget } = req.body;
    const account = {
      name,
      budget,
    };
    Account.insert(account)
      .then(data => {
        return res
          .status(201)
          .json({ message: "account  created successfully", data: account });
      })
      .catch(error => {
        return res
          .status(500)
          .json({ error: "The users information could not be created." });
      });
  });




  accountRoutes.delete('/:id', async (req, res) => {
    const item = await Account.findById(req.params.id);
    try {
        if(item) {
            const account = await Account.remove(req.params.id);
            res.status(200).json({message: "This account has been deleted successfully",  account: item })
        } else {
            res.status(404).json({ message: `The account with the specified ID ${req.params.id} does not exist.` })
        }
    } catch(error) {
        res.status(500).json({ error: "The account could not be removed" })
    }

});


export default  accountRoutes;

