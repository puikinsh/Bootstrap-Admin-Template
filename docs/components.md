# Component Documentation

This guide covers all the UI components available in the Metis Admin Template.

## Table of Contents

- [Layout Components](#layout-components)
- [Navigation Components](#navigation-components)
- [Form Components](#form-components)
- [Data Display Components](#data-display-components)
- [Feedback Components](#feedback-components)
- [Chart Components](#chart-components)

---

## Layout Components

### Sidebar

The sidebar provides navigation and can be collapsed on smaller screens.

```html
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <a href="index.html" class="sidebar-brand">
      <span class="brand-icon">M</span>
      <span class="brand-text">Metis</span>
    </a>
  </div>
  <nav class="sidebar-nav">
    <!-- Navigation items -->
  </nav>
</aside>
```

**Alpine.js Integration:**
```javascript
Alpine.data('sidebar', () => ({
  collapsed: false,
  toggle() {
    this.collapsed = !this.collapsed;
  }
}));
```

### Header

The header contains search, notifications, and user menu.

```html
<header class="main-header">
  <div class="header-left">
    <button class="sidebar-toggle" @click="toggleSidebar()">
      <i class="bi bi-list"></i>
    </button>
  </div>
  <div class="header-right">
    <!-- Search, notifications, user menu -->
  </div>
</header>
```

### Cards

Standard card component with optional header, body, and footer.

```html
<div class="card">
  <div class="card-header">
    <h5 class="card-title">Card Title</h5>
  </div>
  <div class="card-body">
    <!-- Card content -->
  </div>
  <div class="card-footer">
    <!-- Card actions -->
  </div>
</div>
```

**Variants:**
- `.card-primary` - Primary themed card
- `.card-success` - Success themed card
- `.card-warning` - Warning themed card
- `.card-danger` - Danger themed card

---

## Navigation Components

### Breadcrumbs

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>
```

### Tabs

```html
<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab1">
      Tab 1
    </button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab2">
      Tab 2
    </button>
  </li>
</ul>

<div class="tab-content">
  <div class="tab-pane fade show active" id="tab1">Content 1</div>
  <div class="tab-pane fade" id="tab2">Content 2</div>
</div>
```

### Pagination

```html
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#">Previous</a>
    </li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
```

---

## Form Components

### Text Inputs

```html
<div class="mb-3">
  <label for="inputEmail" class="form-label">Email address</label>
  <input type="email" class="form-control" id="inputEmail" placeholder="name@example.com">
  <div class="form-text">We'll never share your email.</div>
</div>
```

### Select

```html
<div class="mb-3">
  <label for="selectExample" class="form-label">Select option</label>
  <select class="form-select" id="selectExample">
    <option selected>Choose...</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</div>
```

### Checkboxes & Radios

```html
<!-- Checkbox -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="check1">
  <label class="form-check-label" for="check1">Check me</label>
</div>

<!-- Radio -->
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioGroup" id="radio1">
  <label class="form-check-label" for="radio1">Option 1</label>
</div>
```

### Switch

```html
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="switch1">
  <label class="form-check-label" for="switch1">Toggle me</label>
</div>
```

### Form Validation with Alpine.js

```html
<form x-data="formValidation()" @submit.prevent="submit()">
  <div class="mb-3">
    <label class="form-label">Email</label>
    <input
      type="email"
      class="form-control"
      :class="{'is-invalid': errors.email}"
      x-model="form.email"
    >
    <div class="invalid-feedback" x-text="errors.email"></div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

```javascript
Alpine.data('formValidation', () => ({
  form: { email: '' },
  errors: {},

  validate() {
    this.errors = {};
    if (!this.form.email) {
      this.errors.email = 'Email is required';
    }
    return Object.keys(this.errors).length === 0;
  },

  submit() {
    if (this.validate()) {
      // Handle form submission
    }
  }
}));
```

---

## Data Display Components

### Tables

```html
<div class="table-responsive">
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td><span class="badge bg-success">Active</span></td>
        <td>
          <button class="btn btn-sm btn-primary">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Table Variants:**
- `.table-striped` - Alternating row colors
- `.table-bordered` - Borders on all sides
- `.table-hover` - Hover effect on rows
- `.table-sm` - Compact table

### Badges

```html
<span class="badge bg-primary">Primary</span>
<span class="badge bg-success">Success</span>
<span class="badge bg-warning text-dark">Warning</span>
<span class="badge bg-danger">Danger</span>
<span class="badge bg-info">Info</span>

<!-- Pill badges -->
<span class="badge rounded-pill bg-primary">Pill</span>
```

### Progress Bars

```html
<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 75%">75%</div>
</div>

<!-- Striped -->
<div class="progress">
  <div class="progress-bar progress-bar-striped" style="width: 50%"></div>
</div>

<!-- Animated -->
<div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
</div>
```

### List Groups

```html
<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Item 1
    <span class="badge bg-primary rounded-pill">14</span>
  </li>
  <li class="list-group-item">Item 2</li>
  <li class="list-group-item">Item 3</li>
</ul>
```

---

## Feedback Components

### Alerts

```html
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <i class="bi bi-check-circle me-2"></i>
  Success message here.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### Toast Notifications (SweetAlert2)

```javascript
import Swal from 'sweetalert2';

// Success toast
Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'Operation completed successfully.',
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

// Confirmation dialog
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    // Handle deletion
  }
});
```

### Modals

```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Open Modal
</button>

<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        Modal content goes here.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

### Tooltips

```html
<button
  type="button"
  class="btn btn-secondary"
  data-bs-toggle="tooltip"
  data-bs-placement="top"
  title="Tooltip text"
>
  Hover me
</button>
```

Initialize tooltips in JavaScript:
```javascript
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));
```

---

## Chart Components

### ApexCharts Integration

```javascript
import ApexCharts from 'apexcharts';

// Line Chart
const options = {
  chart: {
    type: 'line',
    height: 350
  },
  series: [{
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60, 70]
  }],
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();
```

### Chart.js Integration

```javascript
import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        // ...
      ]
    }]
  }
});
```

---

## Alpine.js Components

### Dropdown Component

```html
<div x-data="{ open: false }" class="dropdown">
  <button @click="open = !open" class="btn btn-secondary dropdown-toggle">
    Dropdown
  </button>
  <ul x-show="open" @click.away="open = false" class="dropdown-menu show">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
  </ul>
</div>
```

### Accordion Component

```html
<div x-data="{ active: null }">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        @click="active = active === 1 ? null : 1"
        class="accordion-button"
        :class="{ 'collapsed': active !== 1 }"
      >
        Section 1
      </button>
    </h2>
    <div x-show="active === 1" class="accordion-collapse">
      <div class="accordion-body">Content 1</div>
    </div>
  </div>
</div>
```

---

## Icon Usage

### Bootstrap Icons

```html
<!-- Inline icon -->
<i class="bi bi-house"></i>

<!-- With sizing -->
<i class="bi bi-house" style="font-size: 2rem;"></i>

<!-- Common icons -->
<i class="bi bi-person"></i>      <!-- User -->
<i class="bi bi-gear"></i>        <!-- Settings -->
<i class="bi bi-bell"></i>        <!-- Notification -->
<i class="bi bi-search"></i>      <!-- Search -->
<i class="bi bi-plus-lg"></i>     <!-- Add -->
<i class="bi bi-pencil"></i>      <!-- Edit -->
<i class="bi bi-trash"></i>       <!-- Delete -->
<i class="bi bi-download"></i>    <!-- Download -->
<i class="bi bi-upload"></i>      <!-- Upload -->
```

### Font Awesome Icons

```html
<i class="fa-solid fa-house"></i>
<i class="fa-regular fa-bell"></i>
<i class="fa-brands fa-github"></i>
```

---

## Best Practices

1. **Use semantic HTML** - Use appropriate elements for accessibility
2. **Follow BEM naming** - Keep CSS classes organized and predictable
3. **Leverage Alpine.js** - Use for interactive components instead of custom JS
4. **Mobile-first approach** - Design for mobile, then scale up
5. **Accessibility** - Always include ARIA labels and keyboard navigation
6. **Performance** - Lazy load components and images when possible

---

For more examples, see the live demo pages in `src-modern/`.
