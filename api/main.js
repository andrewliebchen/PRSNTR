import { Mongo } from 'meteor/mongo';

export const Presentations = new Mongo.Collection('presentations');
export const Slides = new Mongo.Collection('slides');
