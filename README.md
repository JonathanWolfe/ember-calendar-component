# Simple Calendar Component
A simple calendar component for Ember that show a month view with a highlight for days with events. Also includes the ability to traverse across months.

![Screenshot](https://raw.github.com/JonathanWolfe/ember-calendar-component/master/screenshot.jpg)

## Usage
1. Copy the `x-calendar.hbs` and `x-calendar.js` into the respective `component` directories.
2. Load in the `x-calendar.css` or `.scss`	varient if you're using Sass.
3. Use `{{x-calendar}}` in your templates to display the calendar.

## Change Display Month/Year
To change the starting date for the calendar away from the current month and year, pass in the `month` and `year` paramaters with appropriate values. **NOTE: MONTH IS ZERO-BASED (0-11)**
```hbs
{{x-calendar month=0 year=2000 }}
```

## Use with Events Highlighted
To display a marker for days with events, pass the paramater `events` with an array of objects that contain a `date` property (which has a valid js [`Date()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) constructor value)
```hbs
{{x-calendar events=exampleDates }}
```
```js
var exampleDates = [
	{
		"date": "2015-07-06T18:32:34-07:00"
	},
	{
		"date": "2015-07-16T08:54:07-07:00"
	},
	{
		"date": "2015-07-17T21:38:52-07:00"
	},
	{
		"date": "2015-07-28T04:30:41-07:00"
	}
];
```

## Notes
* Styling is based on a sidebar of `342px` width. I doubt your containers will be the same so adjust the heights and line-heights of the `.cal-day`s to re-square them up.
