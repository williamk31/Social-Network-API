const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Get single user
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId })
            .populate(['thoughts', 'friends']);
            
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Create new user
    async createUser(req, res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //Update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Delete User
    async deleteUser(req, res) {
        try{ 
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            const deletedThoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });

            return res.status(200).json({ message: 'Deleted User' })
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    //Add friend
    async addFriend(req, res) {
        try{
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                {runValidators: true, new: true }
            );

            if (!friend) {
                res.status(404).json({ message: 'No user by that ID!' })
            }

            res.status(200).json(friend)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //Delete friend
    async deleteFriend(req, res) {
        try{
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { _id: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if(!friend) {
                res.status(404).json({ message: 'No user or friend with that ID' })
            };

            res.status(200).json({ message: 'friend deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};