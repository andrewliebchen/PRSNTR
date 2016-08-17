import { Meteor } from 'meteor/meteor';
import { Presentations } from '../api/main';

Meteor.startup(() => {
  if (Presentations.find({}).fetch().length === 0) {
    Presentations.insert({
      slides: ['1', '2', '3'],
      currentSlide: 0,
      createdAt: Date.now()
    });
  }
});

Meteor.methods({
  toggleBackground(args) {
    return Presentations.update(
      {
        _id: args.presentationId,
        'slides.source': args.slide.source
      }, {
        $set: {
          'slides.$.darkBackground': !args.slide.darkBackground
        }
      }
    );
  },

  createPresentation(args) {
    return Presentations.insert({
      slides: args.slide,
      currentSlide: args.currentSlide,
      createdAt: args.createdAt,
      createdBy: args.createdBy
    });
  },

  createSlide(args) {
    return Presentations.update(args.id, {
      $push: {
        slides: {
          type: args.type,
          source: args.source
        }
      }
    });
  },

  changeSlide(args) {
    return Presentations.update(args.id, {
      $inc: { currentSlide: args.inc }
    });
  },

  updateSlide(args) {
    return Presentations.update(args.id, {
      $set: {
        title: args.title,
        time: args.time
      }
    });
  }
});
