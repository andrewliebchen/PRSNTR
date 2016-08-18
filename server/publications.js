import { Meteor } from 'meteor/meteor';
import { Presentations, Slides } from '../api/main';

Meteor.publish('presentation', function presentationPublication(id) {
  const presentation = Presentations.find({_id: id});
  return [
    presentation,
    Slides.find({presentation: id}),
  ];
});
