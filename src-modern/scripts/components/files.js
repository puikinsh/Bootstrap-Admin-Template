import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('filesComponent', () => ({
    // UI State
    sidebarVisible: false,
    viewMode: 'grid',
    sortBy: 'name',
    selectedFiles: [],
    showUploadZone: false,
    
    // Storage Information
    storageUsed: 45.2,
    storageTotal: 100,
    
    // Current Navigation
    currentFolder: null,
    breadcrumbs: [{ name: 'My Files', path: '/' }],
    
    // Data
    folders: [],
    currentFiles: [],
    recentFiles: [],
    quickAccess: [],
    allFiles: [],

    init() {
      this.loadSampleData();
      this.sortFiles();
      
      // Show upload zone if folder is empty
      this.showUploadZone = this.currentFiles.length === 0;
    },

    // Computed Properties
    get storagePercentage() {
      return (this.storageUsed / this.storageTotal) * 100;
    },

    get storageRemaining() {
      return (this.storageTotal - this.storageUsed).toFixed(1);
    },

    loadSampleData() {
      this.folders = [
        {
          id: 1,
          name: 'Documents',
          fileCount: 23,
          icon: 'bi-folder-fill'
        },
        {
          id: 2,
          name: 'Images',
          fileCount: 156,
          icon: 'bi-folder-fill'
        },
        {
          id: 3,
          name: 'Projects',
          fileCount: 12,
          icon: 'bi-folder-fill'
        },
        {
          id: 4,
          name: 'Shared',
          fileCount: 8,
          icon: 'bi-folder-fill'
        },
        {
          id: 5,
          name: 'Archive',
          fileCount: 45,
          icon: 'bi-folder-fill'
        }
      ];

      this.allFiles = [
        {
          id: 1,
          name: 'Project Proposal.pdf',
          type: 'document',
          typeLabel: 'PDF',
          icon: 'bi-file-earmark-pdf',
          size: '2.4 MB',
          modifiedDate: '2 hours ago',
          folder: 'Documents'
        },
        {
          id: 2,
          name: 'Budget Spreadsheet.xlsx',
          type: 'spreadsheet',
          typeLabel: 'Excel',
          icon: 'bi-file-earmark-spreadsheet',
          size: '856 KB',
          modifiedDate: '1 day ago',
          folder: 'Documents'
        },
        {
          id: 3,
          name: 'Team Photo.jpg',
          type: 'image',
          typeLabel: 'Image',
          icon: 'bi-file-earmark-image',
          size: '4.2 MB',
          modifiedDate: '3 days ago',
          folder: 'Images'
        },
        {
          id: 4,
          name: 'Marketing Presentation.pptx',
          type: 'presentation',
          typeLabel: 'PowerPoint',
          icon: 'bi-file-earmark-ppt',
          size: '12.8 MB',
          modifiedDate: '1 week ago',
          folder: 'Documents'
        },
        {
          id: 5,
          name: 'Demo Video.mp4',
          type: 'video',
          typeLabel: 'Video',
          icon: 'bi-file-earmark-play',
          size: '145 MB',
          modifiedDate: '2 weeks ago',
          folder: 'Projects'
        },
        {
          id: 6,
          name: 'Audio Recording.mp3',
          type: 'audio',
          typeLabel: 'Audio',
          icon: 'bi-file-earmark-music',
          size: '8.5 MB',
          modifiedDate: '3 weeks ago',
          folder: 'Projects'
        },
        {
          id: 7,
          name: 'Archive.zip',
          type: 'archive',
          typeLabel: 'Archive',
          icon: 'bi-file-earmark-zip',
          size: '25.6 MB',
          modifiedDate: '1 month ago',
          folder: 'Archive'
        },
        {
          id: 8,
          name: 'Logo Design.ai',
          type: 'image',
          typeLabel: 'Illustrator',
          icon: 'bi-file-earmark-image',
          size: '3.2 MB',
          modifiedDate: '2 days ago',
          folder: 'Images'
        },
        {
          id: 9,
          name: 'Meeting Notes.docx',
          type: 'document',
          typeLabel: 'Word',
          icon: 'bi-file-earmark-word',
          size: '124 KB',
          modifiedDate: '5 hours ago',
          folder: 'Documents'
        },
        {
          id: 10,
          name: 'Client Contract.pdf',
          type: 'document',
          typeLabel: 'PDF',
          icon: 'bi-file-earmark-pdf',
          size: '1.8 MB',
          modifiedDate: '1 week ago',
          folder: 'Shared'
        },
        {
          id: 11,
          name: 'Screenshot.png',
          type: 'image',
          typeLabel: 'Image',
          icon: 'bi-file-earmark-image',
          size: '956 KB',
          modifiedDate: '6 hours ago',
          folder: 'Images'
        },
        {
          id: 12,
          name: 'Database Backup.sql',
          type: 'document',
          typeLabel: 'SQL',
          icon: 'bi-file-earmark-code',
          size: '89 MB',
          modifiedDate: '3 days ago',
          folder: 'Archive'
        },
        {
          id: 13,
          name: 'Product Catalog.pdf',
          type: 'document',
          typeLabel: 'PDF',
          icon: 'bi-file-earmark-pdf',
          size: '5.7 MB',
          modifiedDate: '4 days ago',
          folder: 'Shared'
        },
        {
          id: 14,
          name: 'Website Mockup.psd',
          type: 'image',
          typeLabel: 'Photoshop',
          icon: 'bi-file-earmark-image',
          size: '67 MB',
          modifiedDate: '1 week ago',
          folder: 'Projects'
        },
        {
          id: 15,
          name: 'Financial Report.xlsx',
          type: 'spreadsheet',
          typeLabel: 'Excel',
          icon: 'bi-file-earmark-spreadsheet',
          size: '2.1 MB',
          modifiedDate: '2 weeks ago',
          folder: 'Documents'
        }
      ];

      // Initialize current files (show all files by default)
      this.currentFiles = [...this.allFiles];

      // Recent files (last 5 files)
      this.recentFiles = this.allFiles
        .sort((a, b) => this.getModifiedTimestamp(a.modifiedDate) - this.getModifiedTimestamp(b.modifiedDate))
        .reverse()
        .slice(0, 5);

      this.quickAccess = [
        {
          name: 'Recent',
          icon: 'bi-clock-history',
          count: this.recentFiles.length,
          type: 'recent'
        },
        {
          name: 'Images',
          icon: 'bi-image',
          count: this.allFiles.filter(f => f.type === 'image').length,
          type: 'images'
        },
        {
          name: 'Documents',
          icon: 'bi-file-earmark-text',
          count: this.allFiles.filter(f => f.type === 'document').length,
          type: 'documents'
        },
        {
          name: 'Shared',
          icon: 'bi-people',
          count: this.allFiles.filter(f => f.folder === 'Shared').length,
          type: 'shared'
        },
        {
          name: 'Trash',
          icon: 'bi-trash',
          count: 0,
          type: 'trash'
        }
      ];
    },

    getModifiedTimestamp(modifiedStr) {
      const now = new Date();
      if (modifiedStr.includes('hour')) {
        const hours = parseInt(modifiedStr);
        return now.getTime() - (hours * 60 * 60 * 1000);
      } else if (modifiedStr.includes('day')) {
        const days = parseInt(modifiedStr);
        return now.getTime() - (days * 24 * 60 * 60 * 1000);
      } else if (modifiedStr.includes('week')) {
        const weeks = parseInt(modifiedStr);
        return now.getTime() - (weeks * 7 * 24 * 60 * 60 * 1000);
      } else if (modifiedStr.includes('month')) {
        const months = parseInt(modifiedStr);
        return now.getTime() - (months * 30 * 24 * 60 * 60 * 1000);
      }
      return now.getTime();
    },

    // File Operations
    sortFiles() {
      this.currentFiles.sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'date':
            return this.getModifiedTimestamp(a.modifiedDate) - this.getModifiedTimestamp(b.modifiedDate);
          case 'size':
            return this.parseSize(a.size) - this.parseSize(b.size);
          case 'type':
            return a.typeLabel.localeCompare(b.typeLabel);
          default:
            return 0;
        }
      });
    },

    parseSize(sizeStr) {
      const parts = sizeStr.split(' ');
      const value = parseFloat(parts[0]);
      const unit = parts[1];
      
      switch (unit) {
        case 'KB':
          return value * 1024;
        case 'MB':
          return value * 1024 * 1024;
        case 'GB':
          return value * 1024 * 1024 * 1024;
        default:
          return value;
      }
    },

    selectFile(file) {
      const index = this.selectedFiles.indexOf(file.id);
      if (index > -1) {
        this.selectedFiles.splice(index, 1);
      } else {
        this.selectedFiles.push(file.id);
      }
    },

    toggleFileSelection(fileId) {
      const index = this.selectedFiles.indexOf(fileId);
      if (index > -1) {
        this.selectedFiles.splice(index, 1);
      } else {
        this.selectedFiles.push(fileId);
      }
    },

    selectAll() {
      if (this.selectedFiles.length === this.currentFiles.length) {
        this.selectedFiles = [];
      } else {
        this.selectedFiles = this.currentFiles.map(f => f.id);
      }
    },

    toggleSelectAll() {
      this.selectAll();
    },

    // Navigation
    openFolder(folder) {
      this.currentFolder = folder;
      this.currentFiles = this.allFiles.filter(f => f.folder === folder.name);
      // Replace breadcrumbs properly - don't just push
      this.breadcrumbs = [
        { name: 'My Files', path: '/' },
        { name: folder.name, path: `/${folder.name}` }
      ];
      this.selectedFiles = [];
      this.showUploadZone = this.currentFiles.length === 0;
      this.sortFiles();
    },

    navigateToBreadcrumb(index) {
      // Properly slice breadcrumbs and navigate
      this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
      
      if (index === 0) {
        // Back to root - My Files
        this.currentFolder = null;
        this.currentFiles = [...this.allFiles];
        this.breadcrumbs = [{ name: 'My Files', path: '/' }];
      } else {
        // Navigate to specific folder
        const folderName = this.breadcrumbs[index].name;
        
        // Check if it's a quick access item
        const quickAccessItem = this.quickAccess.find(q => q.name === folderName);
        if (quickAccessItem) {
          this.navigateToQuickAccessItem(quickAccessItem);
          return;
        }
        
        // Otherwise it's a regular folder
        const folder = this.folders.find(f => f.name === folderName);
        if (folder) {
          this.currentFolder = folder;
          this.currentFiles = this.allFiles.filter(f => f.folder === folder.name);
        } else {
          // Fallback to root if folder not found
          this.currentFolder = null;
          this.currentFiles = [...this.allFiles];
          this.breadcrumbs = [{ name: 'My Files', path: '/' }];
        }
      }
      
      this.selectedFiles = [];
      this.showUploadZone = this.currentFiles.length === 0;
      this.sortFiles();
    },

    navigateToQuickAccess(item) {
      this.navigateToQuickAccessItem(item);
    },

    navigateToQuickAccessItem(item) {
      // Set proper breadcrumbs for quick access
      this.breadcrumbs = [
        { name: 'My Files', path: '/' },
        { name: item.name, path: `/${item.type}` }
      ];
      this.currentFolder = null;
      
      switch (item.type) {
        case 'recent':
          this.currentFiles = [...this.recentFiles];
          break;
        case 'images':
          this.currentFiles = this.allFiles.filter(f => f.type === 'image');
          break;
        case 'documents':
          this.currentFiles = this.allFiles.filter(f => f.type === 'document');
          break;
        case 'shared':
          this.currentFiles = this.allFiles.filter(f => f.folder === 'Shared');
          break;
        case 'trash':
          this.currentFiles = [];
          break;
        default:
          this.currentFiles = [...this.allFiles];
      }
      
      this.selectedFiles = [];
      this.showUploadZone = this.currentFiles.length === 0;
      this.sortFiles();
    },

    // View Controls
    setViewMode(mode) {
      this.viewMode = mode;
    },

    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },

    // File Actions
    openFile(file) {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: `Opening ${file.name}`,
          html: `
            <div class="text-start">
              <p><strong>📁 File:</strong> ${file.name}</p>
              <p><strong>📏 Size:</strong> ${file.size}</p>
              <p><strong>📅 Modified:</strong> ${file.modifiedDate}</p>
              <p><strong>📂 Folder:</strong> ${file.folder}</p>
              <p><strong>🏷️ Type:</strong> ${file.typeLabel}</p>
            </div>
          `,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Open',
          cancelButtonText: 'Close',
          confirmButtonColor: 'var(--bs-primary)'
        }).then((result) => {
          if (result.isConfirmed) {
            this.showNotification(`Opening ${file.name} in default application...`, 'success');
          }
        });
      } else {
        this.showNotification(`Opening ${file.name}`, 'info');
      }
    },

    downloadFile(file) {
      this.showNotification(`📥 Downloading ${file.name}...`, 'success');
      // Simulate download progress
      setTimeout(() => {
        this.showNotification(`✅ ${file.name} downloaded successfully!`, 'success');
      }, 2000);
    },

    downloadSelected() {
      if (this.selectedFiles.length === 0) {
        this.showNotification('❌ No files selected', 'warning');
        return;
      }
      
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Download Selected Files',
          text: `Download ${this.selectedFiles.length} selected files as a ZIP archive?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Download ZIP',
          cancelButtonText: 'Cancel',
          confirmButtonColor: 'var(--bs-primary)'
        }).then((result) => {
          if (result.isConfirmed) {
            this.showNotification(`📦 Creating ZIP archive with ${this.selectedFiles.length} files...`, 'success');
            setTimeout(() => {
              this.showNotification(`✅ ZIP archive downloaded successfully!`, 'success');
            }, 3000);
          }
        });
      } else {
        this.showNotification(`Downloading ${this.selectedFiles.length} files...`, 'success');
      }
    },

    shareFile(file) {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: `Share ${file.name}`,
          html: `
            <div class="text-start">
              <div class="mb-3">
                <label class="form-label">Share with:</label>
                <input type="email" class="form-control" placeholder="Enter email address..." id="shareEmail">
              </div>
              <div class="mb-3">
                <label class="form-label">Permissions:</label>
                <select class="form-select" id="sharePermissions">
                  <option value="view">View only</option>
                  <option value="edit">Can edit</option>
                  <option value="download">Can download</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Share link:</label>
                <div class="input-group">
                  <input type="text" class="form-control" value="https://files.app/share/${file.id}" readonly>
                  <button class="btn btn-outline-secondary" type="button" onclick="navigator.clipboard.writeText('https://files.app/share/${file.id}')">Copy</button>
                </div>
              </div>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Send Invite',
          cancelButtonText: 'Close',
          confirmButtonColor: 'var(--bs-primary)'
        });
      } else {
        this.showNotification('Share dialog would open here', 'info');
      }
    },

    renameFile(file) {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Rename File',
          input: 'text',
          inputValue: file.name,
          inputPlaceholder: 'Enter new file name...',
          showCancelButton: true,
          confirmButtonText: 'Rename',
          cancelButtonText: 'Cancel',
          confirmButtonColor: 'var(--bs-primary)',
          inputValidator: (value) => {
            if (!value || value.trim() === '') {
              return 'Please enter a valid file name';
            }
            if (value === file.name) {
              return 'Please enter a different name';
            }
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const oldName = file.name;
            file.name = result.value.trim();
            this.showNotification(`📝 "${oldName}" renamed to "${file.name}"`, 'success');
          }
        });
      } else {
        const newName = prompt('Enter new file name:', file.name);
        if (newName && newName !== file.name) {
          file.name = newName;
          this.showNotification('File renamed successfully', 'success');
        }
      }
    },

    deleteFile(file) {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Delete File',
          text: `Are you sure you want to delete "${file.name}"? This action cannot be undone.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonColor: 'var(--bs-danger)',
          cancelButtonColor: 'var(--bs-secondary)'
        }).then((result) => {
          if (result.isConfirmed) {
            this.performFileDelete(file);
            this.showNotification(`🗑️ "${file.name}" moved to trash`, 'success');
          }
        });
      } else {
        if (confirm(`Are you sure you want to delete "${file.name}"?`)) {
          this.performFileDelete(file);
          this.showNotification('File deleted successfully', 'success');
        }
      }
    },

    performFileDelete(file) {
      const index = this.currentFiles.findIndex(f => f.id === file.id);
      if (index > -1) {
        this.currentFiles.splice(index, 1);
      }
      
      const allIndex = this.allFiles.findIndex(f => f.id === file.id);
      if (allIndex > -1) {
        this.allFiles.splice(allIndex, 1);
      }
      
      this.selectedFiles = this.selectedFiles.filter(id => id !== file.id);
    },

    deleteSelected() {
      if (this.selectedFiles.length === 0) {
        this.showNotification('❌ No files selected', 'warning');
        return;
      }
      
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Delete Selected Files',
          text: `Are you sure you want to delete ${this.selectedFiles.length} selected files? This action cannot be undone.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete All',
          cancelButtonText: 'Cancel',
          confirmButtonColor: 'var(--bs-danger)',
          cancelButtonColor: 'var(--bs-secondary)'
        }).then((result) => {
          if (result.isConfirmed) {
            const deletedCount = this.selectedFiles.length;
            this.currentFiles = this.currentFiles.filter(f => !this.selectedFiles.includes(f.id));
            this.allFiles = this.allFiles.filter(f => !this.selectedFiles.includes(f.id));
            this.selectedFiles = [];
            this.showNotification(`🗑️ ${deletedCount} files moved to trash`, 'success');
          }
        });
      } else {
        if (confirm(`Are you sure you want to delete ${this.selectedFiles.length} files?`)) {
          this.currentFiles = this.currentFiles.filter(f => !this.selectedFiles.includes(f.id));
          this.allFiles = this.allFiles.filter(f => !this.selectedFiles.includes(f.id));
          this.selectedFiles = [];
          this.showNotification('Files deleted successfully', 'success');
        }
      }
    },

    // File Management
    uploadFile() {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Upload Files',
          html: `
            <div class="text-start">
              <div class="mb-3">
                <label class="form-label">Select files to upload:</label>
                <input type="file" class="form-control" multiple accept="*/*" id="fileUpload">
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="overwriteFiles">
                  <label class="form-check-label" for="overwriteFiles">
                    Overwrite existing files
                  </label>
                </div>
              </div>
              <div class="upload-preview d-none">
                <h6>Files to upload:</h6>
                <ul id="fileList" class="list-unstyled"></ul>
              </div>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Upload',
          cancelButtonText: 'Cancel',
          confirmButtonColor: 'var(--bs-primary)',
          preConfirm: () => {
            const fileInput = document.getElementById('fileUpload');
            if (fileInput.files.length === 0) {
              Swal.showValidationMessage('Please select at least one file');
              return false;
            }
            return Array.from(fileInput.files);
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.showNotification(`☁️ Uploading ${result.value.length} files...`, 'success');
            setTimeout(() => {
              this.showNotification(`✅ ${result.value.length} files uploaded successfully!`, 'success');
            }, 2500);
          }
        });
      } else {
        this.showNotification('File upload dialog would open here', 'info');
      }
    },

    createFolder() {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Create New Folder',
          input: 'text',
          inputPlaceholder: 'Enter folder name...',
          showCancelButton: true,
          confirmButtonText: 'Create',
          cancelButtonText: 'Cancel',
          confirmButtonColor: 'var(--bs-primary)',
          inputValidator: (value) => {
            if (!value || value.trim() === '') {
              return 'Please enter a folder name';
            }
            if (this.folders.some(f => f.name.toLowerCase() === value.toLowerCase())) {
              return 'A folder with this name already exists';
            }
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const newFolder = {
              id: this.folders.length + 1,
              name: result.value.trim(),
              fileCount: 0,
              icon: 'bi-folder-fill'
            };
            this.folders.push(newFolder);
            this.showNotification(`📁 Folder "${newFolder.name}" created successfully`, 'success');
          }
        });
      } else {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
          const newFolder = {
            id: this.folders.length + 1,
            name: folderName,
            fileCount: 0,
            icon: 'bi-folder-fill'
          };
          this.folders.push(newFolder);
          this.showNotification(`Folder "${folderName}" created successfully`, 'success');
        }
      }
    },

    refreshFiles() {
      this.showNotification('🔄 Refreshing files...', 'info');
      // Simulate refresh
      setTimeout(() => {
        this.loadSampleData();
        this.sortFiles();
        this.showNotification('✅ Files refreshed successfully!', 'success');
      }, 1000);
    },

    showNotification(message, type = 'info') {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: message,
          icon: type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info',
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
    results: [],
    
    search() {
      console.log('Searching for:', this.query);
      // Clear results or populate with search results
      if (this.query.length > 2) {
        // Mock search results for demo
        this.results = [
          { title: 'Calendar Events', url: '/calendar', type: 'Page' },
          { title: 'File Manager', url: '/files', type: 'Page' },
          { title: 'User Settings', url: '/settings', type: 'Page' }
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