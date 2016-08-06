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
