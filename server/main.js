import { Meteor } from 'meteor/meteor';
import { Presentations, Slides } from '../api/main';

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
    const presentation = () => {
      return Presentations.insert({
        title: 'Untitled',
        currentSlide: args.currentSlide,
        createdAt: args.createdAt,
        createdBy: args.createdBy
      });
    };

    const newPresentation = presentation();

    Slides.insert({
      type: 'text',
      source: '# Welcome to Slides.🎉!\n\nClick to edit this slide, or delete it and start fresh!',
      order: 0,
      presentation: newPresentation
    });

    return newPresentation;
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
