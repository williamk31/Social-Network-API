const { Thought, User, } = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get a single thought
    async getSingleThought(req, res) {
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create a new thought
    async createThought(req, res) {
        try{
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );

            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json('thought added!');
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //update thought by id
    async updateThought(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //delete thought by id
    async deleteThought(req, res) {
        try{
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
               return res.status(404).json({ message: 'No thought with that ID' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create a reaction
    async createReaction(req, res) {
        try{
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )

            if (!reaction) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //delete reaction
    async deleteReaction(req, res) {
        try{
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if(!reaction) {
                return res.status(404).json({ messae: 'No reaction or thought with this ID'});
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};