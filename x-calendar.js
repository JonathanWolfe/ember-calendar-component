window.FW.Application.XCalendarComponent = window.Ember.Component.extend( {

	month: new Date().getMonth(),
	year: new Date().getFullYear(),

	currMonth: function () {
		'use strict';
		return new Date( this.get( 'year' ), this.get( 'month' ), 1 );
	}.property( 'month', 'year' ),

	currMonthNumber: function () {
		'use strict';
		return this.get( 'currMonth' ).getMonth();
	}.property( 'currMonth' ),

	currMonthYear: function () {
		'use strict';
		return this.get( 'currMonth' ).getFullYear();
	}.property( 'currMonth' ),

	currMonthLength: function () {
		'use strict';
		return this.getDaysInMonth( this.get( 'currMonthNumber' ), this.get( 'currMonthYear' ) );
	}.property( 'currMonthNumber', 'currMonthYear' ),

	currMonthDays: function () {
		'use strict';
		return this.arrayRange( this.get( 'currMonthLength' ) );
	}.property( 'currMonthLength' ),

	currMonthStartDay: function () {
		'use strict';
		return this.startsOn( this.get( 'currMonthNumber' ), this.get( 'currMonthYear' ) );
	}.property( 'currMonthNumber', 'currMonthYear' ),

	prevMonth: function () {
		'use strict';
		return this.prevMonthDate( this.get( 'currMonthNumber' ), this.get( 'currMonthYear' ) );
	}.property( 'currMonthNumber', 'currMonthYear' ),

	prevMonthNumber: function () {
		'use strict';
		return this.get( 'prevMonth' ).getMonth();
	}.property( 'prevMonth' ),

	prevMonthYear: function () {
		'use strict';
		return this.get( 'prevMonth' ).getFullYear();
	}.property( 'prevMonth' ),

	prevMonthLength: function () {
		'use strict';
		return this.getDaysInMonth( this.get( 'prevMonthNumber' ), this.get( 'prevMonthYear' ) );
	}.property( 'prevMonthNumber', 'prevMonthYear' ),

	prevMonthDays: function () {
		'use strict';
		return this.arrayRange( this.get( 'prevMonthLength' ) );
	}.property( 'prevMonthLength' ),

	prevMonthStartDay: function () {
		'use strict';
		return this.startsOn( this.get( 'prevMonthNumber' ), this.get( 'prevMonthYear' ) );
	}.property( 'prevMonthNumber', 'prevMonthYear' ),

	nextMonth: function () {
		'use strict';
		return this.nextMonthDate( this.get( 'currMonthNumber' ), this.get( 'currMonthYear' ) );
	}.property( 'currMonthNumber', 'currMonthYear' ),

	nextMonthNumber: function () {
		'use strict';
		return this.get( 'nextMonth' ).getMonth();
	}.property( 'nextMonth' ),

	nextMonthYear: function () {
		'use strict';
		return this.get( 'nextMonth' ).getFullYear();
	}.property( 'nextMonth' ),

	nextMonthLength: function () {
		'use strict';
		return this.getDaysInMonth( this.get( 'nextMonthNumber' ), this.get( 'nextMonthYear' ) );
	}.property( 'nextMonthNumber', 'nextMonthYear' ),

	nextMonthDays: function () {
		'use strict';
		return this.arrayRange( this.get( 'nextMonthLength' ) );
	}.property( 'nextMonthLength' ),

	nextMonthStartDay: function () {
		'use strict';
		return this.startsOn( this.get( 'nextMonthNumber' ), this.get( 'nextMonthYear' ) );
	}.property( 'nextMonthNumber', 'nextMonthYear' ),

	leapYear: function ( year ) {
		'use strict';

		return ( ( year % 4 === 0 ) && ( year % 100 !== 0 ) ) || ( year % 400 === 0 );
	},

	getDaysInMonth: function ( month, year ) {
		'use strict';

		var daysPerMonth = [ 31, this.leapYear( year ) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

		return daysPerMonth[ month ];
	},

	arrayRange: function ( len ) {
		'use strict';

		var arr = [];

		for ( var i = 0; i < len; i += 1 ) {
			arr[ i ] = i + 1;
		}

		return arr;
	},

	startsOn: function ( month, year ) {
		'use strict';

		var date = new Date( year, month, 0 );
		return date.getDay();
	},

	nextMonthDate: function ( month, year ) {
		'use strict';

		if ( month === 13 ) {
			return new Date( year + 1, 0, 0 );
		}

		return new Date( year, month + 2, 0 );
	},

	prevMonthDate: function ( month, year ) {
		'use strict';

		if ( month === 0 ) {
			return new Date( year - 1, 12, 0 );
		}

		return new Date( year, month, 0 );
	},

	monthName: function ( month ) {
		'use strict';

		var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

		return months[ month ];
	},

	hasEvent: function ( day, events ) {
		'use strict';

		if ( !events ) {
			return false;
		}

		var date = new Date( day ).toDateString();
		var found = false;

		for ( var i = 0; i < events.length; i += 1 ) {

			var event = new Date( events[ i ].date ).toDateString();

			if ( event === date ) {
				found = true;
				break;
			}

		}

		return found;
	},

	isToday: function ( day ) {
		'use strict';
		return new Date().toDateString() === new Date( day ).toDateString();
	},

	dayObj: function () {
		'use strict';

		return {
			value: 0,
			event: false,
			date: '',
			today: false,
			currMonth: false
		};
	},

	calMonthName: function () {
		'use strict';
		return this.monthName( this.get( 'currMonthNumber' ) );
	}.property( 'currMonthNumber' ),

	calWeeks: function () {
		'use strict';

		var weeks = [
			[]
		];
		var events = this.get( 'events' );

		var calPadding = this.get( 'currMonthStartDay' );

		var prevMonthDays = this.get( 'prevMonthDays' ).slice( 0 );
		var prevMonthYear = this.get( 'prevMonthYear' );
		var prevMonthNumber = this.get( 'prevMonthNumber' );

		var currMonthDays = this.get( 'currMonthDays' ).slice( 0 );
		var currMonthYear = this.get( 'currMonthYear' );
		var currMonthNumber = this.get( 'currMonthNumber' );

		var nextMonthDays = this.get( 'nextMonthDays' ).slice( 0 );
		var nextMonthYear = this.get( 'nextMonthYear' );
		var nextMonthNumber = this.get( 'nextMonthNumber' );

		var newDay;

		while ( calPadding > 0 ) {
			newDay = this.dayObj();
			newDay.value = prevMonthDays.pop();
			newDay.date = new Date( prevMonthYear, prevMonthNumber, newDay.value ).toISOString();
			newDay.event = this.hasEvent( newDay.date, events );

			weeks[ 0 ].unshift( newDay );
			calPadding -= 1;
		}

		while ( currMonthDays.length ) {
			newDay = this.dayObj();
			newDay.value = currMonthDays.shift();
			newDay.date = new Date( currMonthYear, currMonthNumber, newDay.value ).toISOString();
			newDay.event = this.hasEvent( newDay.date, events );
			newDay.today = this.isToday( newDay.date );
			newDay.currMonth = true;

			if ( !weeks[ weeks.length - 1 ][ 6 ] ) {
				weeks[ weeks.length - 1 ].push( newDay );
			} else {
				weeks.push( [ newDay ] );
			}
		}

		while ( !weeks[ weeks.length - 1 ][ 6 ] ) {
			newDay = this.dayObj();
			newDay.value = nextMonthDays.shift();
			newDay.date = new Date( nextMonthYear, nextMonthNumber, newDay.value ).toISOString();
			newDay.event = this.hasEvent( newDay.date, events );

			weeks[ weeks.length - 1 ].push( newDay );
		}

		return weeks;
	}.property( 'events.@each', 'currMonthStartDay', 'prevMonthDays', 'prevMonthYear', 'prevMonthNumber', 'currMonthDays', 'currMonthYear', 'currMonthNumber', 'nextMonthDays', 'nextMonthYear', 'nextMonthNumber' ),

	actions: {
		showPrevMonth: function () {
			'use strict';
			this.setProperties( {
				month: this.get( 'prevMonthNumber' ),
				year: this.get( 'prevMonthYear' )
			} );
		},
		showNextMonth: function () {
			'use strict';
			this.setProperties( {
				month: this.get( 'nextMonthNumber' ),
				year: this.get( 'nextMonthYear' )
			} );
		}
	}

} );
