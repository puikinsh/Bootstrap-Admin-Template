import Alpine from 'alpinejs';
import { Modal } from 'bootstrap';

document.addEventListener('alpine:init', () => {
  Alpine.data('calendarComponent', () => ({
    // UI State
    sidebarVisible: false,
    currentView: 'month',
    selectedDate: null,
    selectedDay: null,
    
    // Calendar State
    currentDate: new Date(),
    miniCalendarDate: new Date(),
    
    // Event Types and Filters
    visibleTypes: ['event', 'meeting', 'task', 'reminder', 'deadline'],
    
    // Sample Events Data
    events: [],
    
    // Time slots for week/day view
    hours: [
      '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
      '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
    ],

    init() {
      this.loadSampleEvents();
      this.selectedDate = new Date();
      this.selectedDay = new Date().toISOString().split('T')[0];
      
      // Initialize calendar view
      this.currentDate = new Date();
      this.miniCalendarDate = new Date();
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
        { title: 'Team Meeting', type: 'meeting', time: '10:00', description: 'Weekly team sync and project updates' },
        { title: 'Product Launch', type: 'event', time: '14:00', description: 'Launch event for new product line' },
        { title: 'Stand-up', type: 'meeting', time: '09:00', description: 'Daily team stand-up meeting' },
        { title: 'Client Presentation', type: 'task', time: '11:30', description: 'Present quarterly results to client' },
        { title: 'Payment Due', type: 'reminder', time: '09:00', description: 'Monthly subscription payment reminder' },
        { title: 'Workshop', type: 'event', time: '14:00', description: 'Design thinking workshop' },
        { title: 'Project Deadline', type: 'deadline', time: '17:00', description: 'Final submission for Q1 project' },
        { title: 'Team Lunch', type: 'event', time: '12:00', description: 'Monthly team lunch gathering' },
        { title: 'Board Meeting', type: 'meeting', time: '15:00', description: 'Monthly board meeting and strategy review' },
        { title: 'Training Session', type: 'event', time: '13:00', description: 'Employee training on new software tools' },
        { title: 'One-on-One', type: 'meeting', time: '15:00', description: 'Manager check-in meeting' },
        { title: 'Code Review', type: 'task', time: '16:00', description: 'Review new feature implementations' },
        { title: 'Doctor Appointment', type: 'reminder', time: '14:30', description: 'Annual health checkup appointment' },
        { title: 'Release Planning', type: 'meeting', time: '10:00', description: 'Plan next release cycle' },
        { title: 'Demo Day', type: 'event', time: '14:00', description: 'Quarterly product demo' },
        { title: 'Conference Call', type: 'meeting', time: '10:00', description: 'International team coordination call' },
        { title: 'Sprint Review', type: 'meeting', time: '16:00', description: 'Review sprint deliverables' },
        { title: 'Budget Review', type: 'task', time: '11:00', description: 'Quarterly budget assessment' },
        { title: 'All Hands', type: 'meeting', time: '15:00', description: 'Company-wide monthly meeting' }
      ];
      
      // Get the number of days in current month
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
      // Generate events for future dates in current month
      this.events = [];
      let eventIndex = 0;
      
      // Create events distributed across remaining days of the month
      for (let day = currentDay; day <= daysInMonth && eventIndex < eventTemplates.length; day++) {
        // Skip some days to avoid too many events
        if ((day - currentDay) % 2 === 0 || day === currentDay || day === daysInMonth) {
          const template = eventTemplates[eventIndex];
          const eventDate = new Date(currentYear, currentMonth, day);
          const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          // Create time string based on day
          let timeStr, dateStr;
          if (day === currentDay) {
            timeStr = this.formatTime(template.time);
            dateStr = 'Today';
          } else if (day === currentDay + 1) {
            timeStr = this.formatTime(template.time);
            dateStr = 'Tomorrow';
          } else {
            timeStr = this.formatTime(template.time);
            dateStr = `${currentMonthName} ${day}`;
          }
          
          this.events.push({
            id: eventIndex + 1,
            title: template.title,
            type: template.type,
            time: template.time,
            timeStr: timeStr,
            dateStr: dateStr,
            description: template.description,
            date: dateString,
            dateObj: eventDate,
            read: Math.random() > 0.3 // Most events are read
          });
          
          eventIndex++;
        }
      }
      
      // Add some events for next month too
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const nextMonthName = monthNames[nextMonth];
      
      for (let day = 1; day <= 10 && eventIndex < eventTemplates.length; day += 2) {
        const template = eventTemplates[eventIndex];
        const eventDate = new Date(nextYear, nextMonth, day);
        const dateString = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        this.events.push({
          id: eventIndex + 1,
          title: template.title,
          type: template.type,
          time: template.time,
          timeStr: this.formatTime(template.time),
          dateStr: `${nextMonthName} ${day}`,
          description: template.description,
          date: dateString,
          dateObj: eventDate,
          read: Math.random() > 0.3
        });
        
        eventIndex++;
      }
    },

    formatTime(time24) {
      const [hours, minutes] = time24.split(':');
      const hour12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      return `${hour12}:${minutes} ${ampm}`;
    },

    // Computed Properties
    get currentMonthYear() {
      return this.miniCalendarDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    },

    get currentPeriodTitle() {
      if (this.currentView === 'month') {
        return this.currentDate.toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        });
      } else if (this.currentView === 'week') {
        const startOfWeek = new Date(this.currentDate);
        startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      } else {
        return this.currentDate.toLocaleDateString('en-US', { 
          weekday: 'long',
          month: 'long', 
          day: 'numeric',
          year: 'numeric' 
        });
      }
    },

    get selectedDayTitle() {
      if (!this.selectedDay) return '';
      const date = new Date(this.selectedDay);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    },

    get selectedDayDate() {
      if (!this.selectedDay) return '';
      const date = new Date(this.selectedDay);
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    },

    get miniCalendarDays() {
      const year = this.miniCalendarDate.getFullYear();
      const month = this.miniCalendarDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());
      
      const days = [];
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dateString = date.toISOString().split('T')[0];
        const hasEvents = this.events.some(event => event.date === dateString);
        
        days.push({
          date: dateString,
          day: date.getDate(),
          isToday: this.isToday(date),
          isOtherMonth: date.getMonth() !== month,
          isSelected: dateString === this.selectedDay,
          hasEvents: hasEvents
        });
      }
      return days;
    },

    get calendarDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());
      
      const days = [];
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dateString = date.toISOString().split('T')[0];
        const dayEvents = this.getEventsForDate(dateString).filter(event => 
          this.visibleTypes.includes(event.type)
        );
        
        days.push({
          date: dateString,
          day: date.getDate(),
          isToday: this.isToday(date),
          isOtherMonth: date.getMonth() !== month,
          isSelected: dateString === this.selectedDay,
          events: dayEvents
        });
      }
      return days;
    },

    get weekDays() {
      const startOfWeek = new Date(this.currentDate);
      startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());
      
      const days = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        
        days.push({
          date: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNumber: date.getDate(),
          isToday: this.isToday(date)
        });
      }
      return days;
    },

    get upcomingEvents() {
      const now = new Date();
      return this.events
        .filter(event => {
          if (!this.visibleTypes.includes(event.type)) return false;
          return event.dateObj >= now;
        })
        .sort((a, b) => a.dateObj - b.dateObj)
        .slice(0, 8);
    },

    // Navigation Methods
    previousMonth() {
      const newDate = new Date(this.miniCalendarDate);
      newDate.setMonth(newDate.getMonth() - 1);
      this.miniCalendarDate = newDate;
    },

    nextMonth() {
      const newDate = new Date(this.miniCalendarDate);
      newDate.setMonth(newDate.getMonth() + 1);
      this.miniCalendarDate = newDate;
    },

    previousPeriod() {
      const newDate = new Date(this.currentDate);
      if (this.currentView === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (this.currentView === 'week') {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setDate(newDate.getDate() - 1);
      }
      this.currentDate = newDate;
    },

    nextPeriod() {
      const newDate = new Date(this.currentDate);
      if (this.currentView === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (this.currentView === 'week') {
        newDate.setDate(newDate.getDate() + 7);
      } else {
        newDate.setDate(newDate.getDate() + 1);
      }
      this.currentDate = newDate;
    },

    goToToday() {
      this.currentDate = new Date();
      this.miniCalendarDate = new Date();
      this.selectedDay = new Date().toISOString().split('T')[0];
    },

    switchView(view) {
      this.currentView = view;
      if (view === 'day' && !this.selectedDay) {
        this.selectedDay = new Date().toISOString().split('T')[0];
      }
    },

    // Date Methods
    selectDate(dateString) {
      this.selectedDay = dateString;
      this.selectedDate = new Date(dateString);
      if (this.currentView === 'day') {
        // Update current date for day view
        this.currentDate = new Date(dateString);
      }
    },

    selectDay(day) {
      this.selectDate(day.date);
    },

    isToday(date) {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    },

    isCurrentHour(hour) {
      const now = new Date();
      const currentHour = now.getHours();
      const hourNumber = parseInt(hour.split(':')[0]);
      const isAM = hour.includes('AM');
      
      let hour24 = hourNumber;
      if (!isAM && hourNumber !== 12) {
        hour24 += 12;
      } else if (isAM && hourNumber === 12) {
        hour24 = 0;
      }
      
      return hour24 === currentHour;
    },

    // Event Methods
    getEventsForDate(dateString) {
      return this.events.filter(event => event.date === dateString);
    },

    getEventsForDateTime(dateString, hour) {
      return this.events.filter(event => {
        if (event.date !== dateString) return false;
        return this.eventMatchesHour(event, hour);
      });
    },

    eventMatchesHour(event, hour) {
      const eventHour = parseInt(event.time.split(':')[0]);
      const hourNumber = parseInt(hour.split(':')[0]);
      const isAM = hour.includes('AM');
      
      let hour24 = hourNumber;
      if (!isAM && hourNumber !== 12) {
        hour24 += 12;
      } else if (isAM && hourNumber === 12) {
        hour24 = 0;
      }
      
      return eventHour === hour24;
    },

    getDayEventCount(dateString) {
      return this.getEventsForDate(dateString).length;
    },

    getCategoryCount(type) {
      return this.events.filter(event => event.type === type).length;
    },

    getCategoryColor(type) {
      const colors = {
        event: 'var(--bs-primary)',
        meeting: 'var(--bs-success)',
        task: 'var(--bs-warning)',
        reminder: '#8b5cf6',
        deadline: 'var(--bs-danger)'
      };
      return colors[type] || 'var(--bs-secondary)';
    },

    getBadgeClass(type) {
      const classes = {
        event: 'bg-primary',
        meeting: 'bg-success',
        task: 'bg-warning text-dark',
        reminder: 'text-white',
        deadline: 'bg-danger'
      };
      return classes[type] || 'bg-secondary';
    },

    getAlertClass(type) {
      const classes = {
        event: 'alert-primary',
        meeting: 'alert-success',
        task: 'alert-warning',
        reminder: 'alert-info',
        deadline: 'alert-danger'
      };
      return classes[type] || 'alert-secondary';
    },

    // Event Actions
    viewEvent(event) {
      this.showNotification(`Viewing event: ${event.title}`, 'info');
    },

    addEvent() {
      // Open the add event modal
      const modal = new Modal(document.getElementById('addEventModal'));
      modal.show();
    },

    addEventForDay(day) {
      this.selectDay(day);
      // Pre-fill the date in the modal
      const addEventModalComponent = Alpine.$data(document.querySelector('[x-data*="addEventModal"]'));
      if (addEventModalComponent) {
        addEventModalComponent.eventData.date = day.date;
      }
      this.addEvent();
    },

    addEventAtTime(dateString, hour) {
      this.selectDate(dateString);
      // Pre-fill the date and time in the modal
      const addEventModalComponent = Alpine.$data(document.querySelector('[x-data*="addEventModal"]'));
      if (addEventModalComponent) {
        addEventModalComponent.eventData.date = dateString;
        // Convert hour to 24-hour format for the time input
        const hourNumber = parseInt(hour.split(':')[0]);
        const isAM = hour.includes('AM');
        let hour24 = hourNumber;
        if (!isAM && hourNumber !== 12) {
          hour24 += 12;
        } else if (isAM && hourNumber === 12) {
          hour24 = 0;
        }
        addEventModalComponent.eventData.time = `${hour24.toString().padStart(2, '0')}:00`;
      }
      this.addEvent();
    },

    showMoreEvents(day) {
      this.selectDay(day);
      this.showNotification(`Showing all events for ${day.date}`, 'info');
    },

    exportCalendar() {
      this.showNotification('Calendar export would start here', 'info');
    },

    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
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

  // Add Event Modal Component
  Alpine.data('addEventModal', () => ({
    eventData: {
      title: '',
      type: 'event',
      date: '',
      time: '',
      description: '',
      duration: '60',
      recurring: false,
      recurrence: 'weekly',
      priority: 'medium',
      reminders: ['15'],
      attendees: '',
      location: ''
    },

    priorityOptions: [
      { value: 'low', label: 'Low Priority', color: 'var(--bs-success)' },
      { value: 'medium', label: 'Medium Priority', color: 'var(--bs-warning)' },
      { value: 'high', label: 'High Priority', color: 'var(--bs-danger)' }
    ],

    reminderOptions: [
      { value: '0', label: 'At time of event' },
      { value: '5', label: '5 minutes before' },
      { value: '15', label: '15 minutes before' },
      { value: '30', label: '30 minutes before' },
      { value: '60', label: '1 hour before' },
      { value: '1440', label: '1 day before' }
    ],

    init() {
      // Initialize with today's date
      this.eventData.date = new Date().toISOString().split('T')[0];
      this.eventData.time = '09:00';
    },

    submitEvent() {
      if (!this.eventData.title.trim()) {
        this.showValidationError('Please enter an event title');
        return;
      }

      if (!this.eventData.date) {
        this.showValidationError('Please select a date');
        return;
      }

      if (!this.eventData.time) {
        this.showValidationError('Please select a time');
        return;
      }

      // Format the event data for display
      const formattedEvent = {
        ...this.eventData,
        formattedDate: new Date(this.eventData.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        formattedTime: new Date(`2000-01-01T${this.eventData.time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };

      console.log('Creating event:', formattedEvent);
      
      // Show success message with event details
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Event Created Successfully!',
          html: `
            <div class="text-start">
              <p><strong>📅 Event:</strong> ${formattedEvent.title}</p>
              <p><strong>📋 Type:</strong> ${formattedEvent.type.charAt(0).toUpperCase() + formattedEvent.type.slice(1)}</p>
              <p><strong>📆 Date:</strong> ${formattedEvent.formattedDate}</p>
              <p><strong>🕐 Time:</strong> ${formattedEvent.formattedTime}</p>
              ${formattedEvent.description ? `<p><strong>📝 Description:</strong> ${formattedEvent.description}</p>` : ''}
              ${formattedEvent.location ? `<p><strong>📍 Location:</strong> ${formattedEvent.location}</p>` : ''}
              <p><strong>⏱️ Duration:</strong> ${this.getDurationLabel(formattedEvent.duration)}</p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'Awesome!',
          confirmButtonColor: 'var(--bs-primary)'
        });
      } else {
        alert(`Event "${this.eventData.title}" created successfully!`);
      }

      // Close modal and reset form
      this.closeModal();
    },

    getDurationLabel(duration) {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      
      if (duration == 480) return 'All day';
      if (hours === 0) return `${minutes} minutes`;
      if (minutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
      return `${hours}h ${minutes}m`;
    },

    showValidationError(message) {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Validation Error',
          text: message,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'var(--bs-danger)'
        });
      } else {
        alert(message);
      }
    },

    closeModal() {
      const modal = document.getElementById('addEventModal');
      if (modal) {
        const bsModal = Modal.getInstance(modal);
        if (bsModal) {
          bsModal.hide();
        }
      }
      this.resetForm();
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
        recurrence: 'weekly',
        priority: 'medium',
        reminders: ['15'],
        attendees: '',
        location: ''
      };
    },

    getTypeColor(type) {
      const colors = {
        event: 'var(--bs-primary)',
        meeting: 'var(--bs-success)',
        task: 'var(--bs-warning)',
        reminder: '#8b5cf6',
        deadline: 'var(--bs-danger)'
      };
      return colors[type] || 'var(--bs-secondary)';
    }
  }));

  // Search component for header
  Alpine.data('searchComponent', () => ({
    query: '',
    results: [],
    
    search() {
      // Simulate search results
      if (this.query.length > 2) {
        this.results = [
          { title: 'Team Meeting', url: '/calendar.html', type: 'Event' },
          { title: 'Calendar Settings', url: '/settings.html', type: 'Page' },
          { title: 'Project Timeline', url: '/calendar.html', type: 'Event' }
        ].filter(item => 
          item.title.toLowerCase().includes(this.query.toLowerCase())
        );
      } else {
        this.results = [];
      }
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
});