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

The sidebar provides navigation and uses Bootstrap's collapse for submenus.

```html
<aside class="admin-sidebar" id="admin-sidebar">
  <div class="sidebar-content">
    <nav class="sidebar-nav">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" href="./index.html">
            <i class="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <!-- More nav items -->
      </ul>
    </nav>
  </div>
</aside>
```

**Submenu with Collapse:**
```html
<li class="nav-item">
  <a class="nav-link" href="#" data-bs-toggle="collapse" data-bs-target="#elementsSubmenu">
    <i class="bi bi-puzzle"></i>
    <span>Elements</span>
    <i class="bi bi-chevron-down ms-auto"></i>
  </a>
  <div class="collapse" id="elementsSubmenu">
    <ul class="nav nav-submenu">
      <li class="nav-item">
        <a class="nav-link" href="./elements.html">
          <i class="bi bi-grid"></i>
          <span>Overview</span>
        </a>
      </li>
    </ul>
  </div>
</li>
```

### Header

The header contains the brand, search, and user controls.

```html
<header class="admin-header">
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container-fluid">
      <!-- Brand -->
      <a class="navbar-brand d-flex align-items-center" href="./index.html">
        <img src="/assets/images/logo.svg" alt="Logo" height="32">
        <h1 class="h4 mb-0 fw-bold text-primary">Metis</h1>
      </a>

      <!-- Search Bar with Alpine.js -->
      <div class="search-container flex-grow-1 mx-4" x-data="searchComponent">
        <input type="search" class="form-control" placeholder="Search... (Ctrl+K)"
               x-model="query" @input="search()" data-search-input>
      </div>

      <!-- Right Side Controls -->
      <div class="navbar-nav flex-row">
        <!-- Theme toggle, notifications, user menu -->
      </div>
    </div>
  </nav>
</header>
```

### Cards

Standard Bootstrap 5 card component with custom styling.

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

**Note:** Cards in this template have `border-width: 0` and use `box-shadow` for elevation.

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

The template uses a `NotificationManager` class that wraps SweetAlert2:

```javascript
// Access via the global app instance
window.AdminApp.notificationManager.success('Operation completed!');
window.AdminApp.notificationManager.error('Something went wrong');
window.AdminApp.notificationManager.warning('Please check your input');
window.AdminApp.notificationManager.info('New update available');
```

**Direct SweetAlert2 usage:**

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

Tooltips are automatically initialized by `main.js`:

```html
<button type="button" class="btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Tooltip text">
  Hover me
</button>
```

---

## Chart Components

### ApexCharts Integration

```javascript
import ApexCharts from 'apexcharts';

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
      data: [12, 19, 3, 5, 2, 3]
    }]
  }
});
```

---

## Alpine.js Components

### Built-in Components

The template includes these Alpine.js components registered in `main.js`:

**searchComponent** - Global search functionality:
```html
<div x-data="searchComponent">
  <input type="search" x-model="query" @input="search()">
  <template x-for="result in results">
    <a :href="result.url" x-text="result.title"></a>
  </template>
</div>
```

**themeSwitch** - Dark/light mode toggle:
```html
<div x-data="themeSwitch">
  <button @click="toggle()">
    <i class="bi bi-sun-fill" x-show="currentTheme === 'light'"></i>
    <i class="bi bi-moon-fill" x-show="currentTheme === 'dark'"></i>
  </button>
</div>
```

**statsCounter** - Animated counter:
```html
<div x-data="statsCounter(1000, 5)">
  <span x-text="value"></span>
</div>
```

---

## Icon Usage

### Bootstrap Icons (Primary)

```html
<!-- Inline icon -->
<i class="bi bi-house"></i>

<!-- With sizing -->
<i class="bi bi-house" style="font-size: 2rem;"></i>

<!-- Common icons used in template -->
<i class="bi bi-speedometer2"></i>  <!-- Dashboard -->
<i class="bi bi-people"></i>        <!-- Users -->
<i class="bi bi-graph-up"></i>      <!-- Analytics -->
<i class="bi bi-gear"></i>          <!-- Settings -->
<i class="bi bi-bell"></i>          <!-- Notifications -->
<i class="bi bi-search"></i>        <!-- Search -->
<i class="bi bi-plus-lg"></i>       <!-- Add -->
<i class="bi bi-pencil"></i>        <!-- Edit -->
<i class="bi bi-trash"></i>         <!-- Delete -->
```

### Font Awesome (Optional)

```html
<i class="fa-solid fa-house"></i>
<i class="fa-regular fa-bell"></i>
<i class="fa-brands fa-github"></i>
```

---

## Best Practices

1. **Use semantic HTML** - Use appropriate elements for accessibility
2. **Leverage Bootstrap 5 utilities** - Use utility classes instead of custom CSS
3. **Use Alpine.js for interactivity** - Keep JavaScript simple and declarative
4. **Mobile-first approach** - Design for mobile, then scale up
5. **Accessibility** - Include ARIA labels and support keyboard navigation
6. **Use the page data attribute** - Set `data-page` on body for page-specific JS

---

For more examples, see the live demo pages in `src-modern/`.
