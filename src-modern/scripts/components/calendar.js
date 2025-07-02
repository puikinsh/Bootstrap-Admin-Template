import Alpine from 'alpinejs';
import { Modal } from 'bootstrap';

document.addEventListener('alpine:init', () => {
  Alpine.data('calendarComponent', () => ({
    // UI State
    sidebarVisible: false,
    currentView: 'month',
    selectedDate: null,
    showEventModal: false,
    
    // Calendar State
    currentDate: new Date(),
    selectedConversation: null,
    
    // Event Types and Filters
    visibleTypes: ['event', 'meeting', 'task', 'reminder', 'deadline'],
    
    // Sample Events Data
    events: [],
    
    init() {
      this.loadSampleEvents();
      this.selectedDate = new Date();
      
      // Initialize calendar view
      this.currentDate = new Date();
    },

    loadSampleEvents() {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const currentDay = today.getDate();
      
      // Get current month name for display
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentMonthName = monthNames[currentMonth];
      
      // Generate future events for the current month
      const eventTemplates = [
        { title: 'Team Meeting', type: 'meeting', time: '10:00 AM', description: 'Weekly team sync and project updates' },
        { title: 'Product Launch', type: 'event', time: '2:00 PM', description: 'Launch event for new product line' },
        { title: 'Stand-up', type: 'meeting', time: '9:00 AM', description: 'Daily team stand-up meeting' },
        { title: 'Client Presentation', type: 'task', time: '11:30 AM', description: 'Present quarterly results to client' },
        { title: 'Payment Due', type: 'reminder', time: '9:00 AM', description: 'Monthly subscription payment reminder' },
        { title: 'Workshop', type: 'event', time: '2:00 PM', description: 'Design thinking workshop' },
        { title: 'Project Deadline', type: 'deadline', time: '5:00 PM', description: 'Final submission for Q1 project' },
        { title: 'Team Lunch', type: 'event', time: '12:00 PM', description: 'Monthly team lunch gathering' },
        { title: 'Board Meeting', type: 'meeting', time: '3:00 PM', description: 'Monthly board meeting and strategy review' },
        { title: 'Training Session', type: 'event', time: '1:00 PM', description: 'Employee training on new software tools' },
        { title: 'One-on-One', type: 'meeting', time: '3:00 PM', description: 'Manager check-in meeting' },
        { title: 'Code Review', type: 'task', time: '4:00 PM', description: 'Review new feature implementations' },
        { title: 'Doctor Appointment', type: 'reminder', time: '2:30 PM', description: 'Annual health checkup appointment' },
        { title: 'Release Planning', type: 'meeting', time: '10:00 AM', description: 'Plan next release cycle' },
        { title: 'Demo Day', type: 'event', time: '2:00 PM', description: 'Quarterly product demo' },
        { title: 'Conference Call', type: 'meeting', time: '10:00 AM', description: 'International team coordination call' },
        { title: 'Sprint Review', type: 'meeting', time: '4:00 PM', description: 'Review sprint deliverables' },
        { title: 'Budget Review', type: 'task', time: '11:00 AM', description: 'Quarterly budget assessment' },
        { title: 'All Hands', type: 'meeting', time: '3:00 PM', description: 'Company-wide monthly meeting' }
      ];
      
      // Get the number of days in current month
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
      // Generate events for future dates in current month
      this.events = [];
      let eventIndex = 0;
      
      // Start from today or tomorrow
      let startDay = currentDay;
      if (currentDay === daysInMonth) {
        // If it's the last day of month, start from today
        startDay = currentDay;
      } else {
        // Start from today for better showcase
        startDay = currentDay;
      }
      
      // Create events distributed across remaining days of the month
      for (let day = startDay; day <= daysInMonth && eventIndex < eventTemplates.length; day++) {
        // Skip some days to avoid too many events
        if ((day - startDay) % 2 === 0 || day === startDay || day === daysInMonth) {
          const template = eventTemplates[eventIndex];
          const eventDate = new Date(currentYear, currentMonth, day);
          const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          // Create time string based on day
          let timeStr;
          if (day === currentDay) {
            timeStr = `Today ${template.time}`;
          } else if (day === currentDay + 1) {
            timeStr = `Tomorrow ${template.time}`;
          } else {
            timeStr = `${currentMonthName} ${day} ${template.time}`;
          }
          
          this.events.push({
            id: eventIndex + 1,
            title: template.title,
            type: template.type,
            date: dateString,
            time: template.time,
            timeStr: timeStr,
            description: template.description
          });
          
          eventIndex++;
          
          // Add multiple events on some days
          if (day === currentDay + 2 && eventIndex < eventTemplates.length) {
            const template2 = eventTemplates[eventIndex];
            this.events.push({
              id: eventIndex + 1,
              title: template2.title,
              type: template2.type,
              date: dateString,
              time: template2.time,
              timeStr: `${currentMonthName} ${day} ${template2.time}`,
              description: template2.description
            });
            eventIndex++;
          }
          
          if (day === Math.min(currentDay + 7, daysInMonth) && eventIndex < eventTemplates.length) {
            const template3 = eventTemplates[eventIndex];
            this.events.push({
              id: eventIndex + 1,
              title: template3.title,
              type: template3.type,
              date: dateString,
              time: template3.time,
              timeStr: `${currentMonthName} ${day} ${template3.time}`,
              description: template3.description
            });
            eventIndex++;
          }
        }
      }
      
      // If we're near the end of month and don't have enough events, add more to earlier future dates
      if (this.events.length < 8 && currentDay < daysInMonth - 5) {
        for (let day = currentDay + 1; day <= Math.min(currentDay + 10, daysInMonth) && eventIndex < eventTemplates.length; day++) {
          if (this.events.filter(e => e.date.endsWith(String(day).padStart(2, '0'))).length === 0) {
            const template = eventTemplates[eventIndex];
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            this.events.push({
              id: eventIndex + 1,
              title: template.title,
              type: template.type,
              date: dateString,
              time: template.time,
              timeStr: `${currentMonthName} ${day} ${template.time}`,
              description: template.description
            });
            eventIndex++;
          }
        }
      }
    },

    // Computed Properties
    get currentMonthYear() {
      return this.currentDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    },

    get currentPeriodTitle() {
      switch (this.currentView) {
        case 'month':
          return this.currentMonthYear;
        case 'week':
          return `Week of ${this.currentDate.toLocaleDateString()}`;
        case 'day':
          return this.currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          });
        default:
          return this.currentMonthYear;
      }
    },

    get miniCalendarDays() {
      const days = [];
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      
      // Get first day of month and how many days in month
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      // Add previous month's trailing days
      const prevMonth = new Date(year, month, 0);
      const daysInPrevMonth = prevMonth.getDate();
      
      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        days.push({
          day: day,
          date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          isOtherMonth: true,
          isToday: false
        });
      }
      
      // Add current month days
      const today = new Date();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        days.push({
          day: day,
          date: dateStr,
          isOtherMonth: false,
          isToday: this.isSameDay(date, today)
        });
      }
      
      // Add next month's leading days to fill grid
      const totalCells = Math.ceil(days.length / 7) * 7;
      let nextMonthDay = 1;
      
      for (let i = days.length; i < totalCells; i++) {
        const nextMonth = month + 1;
        const nextYear = nextMonth > 11 ? year + 1 : year;
        const adjustedMonth = nextMonth > 11 ? 0 : nextMonth;
        
        days.push({
          day: nextMonthDay,
          date: `${nextYear}-${String(adjustedMonth + 1).padStart(2, '0')}-${String(nextMonthDay).padStart(2, '0')}`,
          isOtherMonth: true,
          isToday: false
        });
        nextMonthDay++;
      }
      
      return days;
    },

    get calendarDays() {
      const days = this.miniCalendarDays.map(day => ({
        ...day,
        events: this.getEventsForDate(day.date),
        isSelected: this.selectedDate && day.date === this.formatDate(this.selectedDate)
      }));
      
      return days;
    },

    get upcomingEvents() {
      const today = new Date();
      return this.events
        .filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= today && this.visibleTypes.includes(event.type);
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);
    },

    get weekDays() {
      const startOfWeek = this.getStartOfWeek(this.currentDate);
      const days = [];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        
        days.push({
          date: this.formatDate(date),
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNumber: date.getDate(),
          isToday: this.isSameDay(date, new Date())
        });
      }
      
      return days;
    },

    get hours() {
      const hours = [];
      for (let i = 0; i < 24; i++) {
        const hour12 = i === 0 ? 12 : i > 12 ? i - 12 : i;
        const ampm = i < 12 ? 'AM' : 'PM';
        hours.push(`${hour12}:00 ${ampm}`);
      }
      return hours;
    },

    get selectedDay() {
      return this.selectedDate ? this.formatDate(this.selectedDate) : this.formatDate(new Date());
    },

    get selectedDayTitle() {
      const date = this.selectedDate || new Date();
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    },

    get selectedDayDate() {
      const date = this.selectedDate || new Date();
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    },

    get currentTimePosition() {
      const now = new Date();
      const minutes = now.getMinutes();
      return (minutes / 60) * 60; // Position within the hour slot
    },

    // Date Utilities
    isSameDay(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
    },

    formatDate(date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    },

    getEventsForDate(dateStr) {
      return this.events.filter(event => 
        event.date === dateStr && this.visibleTypes.includes(event.type)
      );
    },

    getStartOfWeek(date) {
      const result = new Date(date);
      const day = result.getDay();
      const diff = result.getDate() - day;
      return new Date(result.setDate(diff));
    },

    getEventsForDayAndHour(dateStr, hourStr) {
      const events = this.getEventsForDate(dateStr);
      return events.map(event => {
        // Parse event time and calculate position
        const eventTime = this.parseTime(event.time);
        const hourTime = this.parseTime(hourStr);
        
        if (eventTime.hour === hourTime.hour) {
          return {
            ...event,
            minuteOffset: eventTime.minutes,
            duration: 60 // Default 1 hour duration
          };
        }
        return null;
      }).filter(Boolean);
    },

    parseTime(timeStr) {
      // Parse time like "10:00 AM" or "2:30 PM"
      const [time, period] = timeStr.split(' ');
      const [hourStr, minuteStr] = time.split(':');
      let hour = parseInt(hourStr);
      const minutes = parseInt(minuteStr || '0');
      
      if (period === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }
      
      return { hour, minutes };
    },

    isCurrentHour(hourStr) {
      const now = new Date();
      const currentHour = now.getHours();
      const hourTime = this.parseTime(hourStr);
      return hourTime.hour === currentHour;
    },

    isToday(dateStr) {
      const today = new Date();
      const date = new Date(dateStr);
      return this.isSameDay(today, date);
    },

    addEventAtTime(dateStr, hourStr) {
      // Parse the hour string to get time in HH:MM format
      const time24 = this.convertTo24Hour(hourStr);
      
      // Show the modal with pre-filled data
      const modalElement = document.getElementById('addEventModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        
        // Set default date and time in the modal
        const addEventComponent = Alpine.$data(modalElement.querySelector('[x-data="addEventModal"]'));
        if (addEventComponent) {
          addEventComponent.eventData.date = dateStr;
          addEventComponent.eventData.time = time24;
        }
        
        modal.show();
      }
    },

    convertTo24Hour(timeStr) {
      // Convert "10:00 AM" to "10:00"
      const [time, period] = timeStr.split(' ');
      const [hourStr, minuteStr] = time.split(':');
      let hour = parseInt(hourStr);
      const minutes = minuteStr || '00';
      
      if (period === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }
      
      return `${hour.toString().padStart(2, '0')}:${minutes}`;
    },

    eventMatchesHour(event, hourStr) {
      const eventTime = this.parseTime(event.time);
      const hourTime = this.parseTime(hourStr);
      return eventTime.hour === hourTime.hour;
    },

    getBadgeClass(eventType) {
      const classes = {
        'event': 'bg-primary',
        'meeting': 'bg-success',
        'task': 'bg-warning',
        'reminder': 'bg-info',
        'deadline': 'bg-danger'
      };
      return classes[eventType] || 'bg-secondary';
    },

    getAlertClass(eventType) {
      const classes = {
        'event': 'alert-primary',
        'meeting': 'alert-success',
        'task': 'alert-warning',
        'reminder': 'alert-info',
        'deadline': 'alert-danger'
      };
      return classes[eventType] || 'alert-secondary';
    },

    // Navigation Methods
    previousMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    },

    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },

    previousPeriod() {
      switch (this.currentView) {
        case 'month':
          this.previousMonth();
          break;
        case 'week':
          this.currentDate = new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'day':
          this.currentDate = new Date(this.currentDate.getTime() - 24 * 60 * 60 * 1000);
          break;
      }
    },

    nextPeriod() {
      switch (this.currentView) {
        case 'month':
          this.nextMonth();
          break;
        case 'week':
          this.currentDate = new Date(this.currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case 'day':
          this.currentDate = new Date(this.currentDate.getTime() + 24 * 60 * 60 * 1000);
          break;
      }
    },

    goToToday() {
      this.currentDate = new Date();
      this.selectedDate = new Date();
    },

    switchView(view) {
      this.currentView = view;
      
      // Set selectedDate to currentDate when switching to day view
      if (view === 'day') {
        this.selectedDate = new Date(this.currentDate);
      }
    },

    // Event Handlers
    selectDate(dateStr) {
      this.selectedDate = new Date(dateStr);
      // Auto-switch to main calendar month if needed
      const selectedMonth = this.selectedDate.getMonth();
      const currentMonth = this.currentDate.getMonth();
      
      if (selectedMonth !== currentMonth) {
        this.currentDate = new Date(this.selectedDate.getFullYear(), selectedMonth, 1);
      }
    },

    selectDay(day) {
      this.selectedDate = new Date(day.date);
      
      // If clicked on other month day, navigate to that month
      if (day.isOtherMonth) {
        const clickedDate = new Date(day.date);
        this.currentDate = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), 1);
      }
    },

    viewEvent(event) {
      this.showNotification(`Viewing: ${event.title}`, 'info');
      console.log('Event details:', event);
    },

    addEvent() {
      // Pre-fill with current date if available
      const defaultDate = this.selectedDate || this.currentDate;
      
      // Show the modal
      const modalElement = document.getElementById('addEventModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        
        // Set default date in the modal
        const addEventComponent = Alpine.$data(modalElement.querySelector('[x-data="addEventModal"]'));
        if (addEventComponent) {
          addEventComponent.eventData.date = this.formatDate(defaultDate);
        }
        
        modal.show();
      }
    },

    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },

    exportCalendar() {
      this.showNotification('Calendar export would start here', 'info');
    },

    showNotification(message, type = 'info') {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: message,
          icon: type === 'success' ? 'success' : type === 'error' ? 'error' : 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        alert(message);
      }
    }
  }));

  // Search component for header
  Alpine.data('searchComponent', () => ({
    query: '',
    
    search() {
      console.log('Searching for:', this.query);
    }
  }));

  // Theme switch component
  Alpine.data('themeSwitch', () => ({
    currentTheme: 'light',

    init() {
      this.currentTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    },

    toggle() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    }
  }));

  // Add Event Modal component
  Alpine.data('addEventModal', () => ({
    eventData: {
      title: '',
      type: 'event',
      date: '',
      time: '',
      description: '',
      duration: '60',
      recurring: false,
      recurrence: 'weekly'
    },

    init() {
      // Set default date to today
      const today = new Date();
      this.eventData.date = today.toISOString().split('T')[0];
      this.eventData.time = '09:00';
    },

    submitEvent() {
      // Validate required fields
      if (!this.eventData.title.trim()) {
        this.showNotification('Event title is required', 'error');
        return;
      }

      if (!this.eventData.date) {
        this.showNotification('Event date is required', 'error');
        return;
      }

      if (!this.eventData.time) {
        this.showNotification('Event time is required', 'error');
        return;
      }

      // Convert 24-hour time to 12-hour format for display
      const time12 = this.convertTo12Hour(this.eventData.time);

      // Create event summary
      const eventSummary = {
        title: this.eventData.title,
        type: this.eventData.type,
        date: this.eventData.date,
        time: time12,
        description: this.eventData.description,
        duration: this.eventData.duration,
        recurring: this.eventData.recurring ? this.eventData.recurrence : null
      };

      // Show success message with event details
      let message = `Event "${eventSummary.title}" created for ${eventSummary.date} at ${eventSummary.time}`;
      
      if (eventSummary.recurring) {
        message += ` (${eventSummary.recurring} recurring)`;
      }

      this.showNotification(message, 'success');

      // Reset form
      this.resetForm();

      // Close modal
      const modalElement = document.getElementById('addEventModal');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    },

    convertTo12Hour(time24) {
      const [hour, minute] = time24.split(':');
      const hour12 = parseInt(hour);
      const ampm = hour12 >= 12 ? 'PM' : 'AM';
      const displayHour = hour12 === 0 ? 12 : hour12 > 12 ? hour12 - 12 : hour12;
      return `${displayHour}:${minute} ${ampm}`;
    },

    resetForm() {
      this.eventData = {
        title: '',
        type: 'event',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        description: '',
        duration: '60',
        recurring: false,
        recurrence: 'weekly'
      };
    },

    showNotification(message, type = 'info') {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: message,
          icon: type === 'success' ? 'success' : type === 'error' ? 'error' : 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true
        });
      } else {
        alert(message);
      }
    }
  }));
});