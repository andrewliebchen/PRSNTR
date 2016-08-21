import { Meteor } from 'meteor/meteor';
import { Presentations, Slides } from '../api/main';

Meteor.methods({
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
      source: '# Welcome to Slides 🎉!\n\nClick to edit this slide, or delete it and start fresh!',
      order: 0,
      presentation: newPresentation
    });

    return newPresentation;
  },

  createSlide(args) {
    const highestOrderValue = Slides.findOne({}, {sort: {order: -1}}).order;
    return Slides.insert({
      presentation: args.presentation,
      type: args.type,
      source: args.source,
      order: highestOrderValue + 1
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
  },

  reOrderSlide(args) {
    const dragOverOrder = Slides.findOne(args.dragOver).order;
    const nextOrder = Slides.findOne({order: {$gt: dragOverOrder}}).order;
    const newOrder = (dragOverOrder + nextOrder) / 2;

    // Update dragged over slide
    Slides.update(args.dragOver, {
      $set: {
        order: newOrder
      }
    });

    // Update dragged slide
    return Slides.update(args.dragging, {
      $set: {
        order: dragOverOrder
      }
    });
  },

  deleteSlide(id) {
    return Slides.remove(id);
  },

  updateSlide(args) {
    return Slides.update(args.id, {
      $set: {
        type: args.type,
        source: args.source
      }
    });
  },

  toggleBackground(slide) {
    return Slides.update(slide._id, {
      $set: {
        darkBackground: !slide.darkBackground
      }
    })
  }
});
