import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('messagesComponent', () => ({
    // UI State
    sidebarVisible: false,
    searchQuery: '',
    selectedConversation: null,
    newMessage: '',
    showEmojiPicker: false,
    isTyping: false,

    // Data
    conversations: [],
    filteredConversations: [],
    currentMessages: [],
    emojis: ['😀', '😃', '😄', '😁', '😊', '😍', '🥰', '😘', '👍', '👏', '🎉', '❤️', '🔥', '💯', '😂', '🤔'],

    init() {
      this.loadSampleData();
      this.filterConversations();
      
      // Auto-select first conversation on desktop
      if (window.innerWidth >= 992 && this.conversations.length > 0) {
        this.selectConversation(this.conversations[0]);
      }

      // Simulate typing indicator occasionally
      this.simulateActivity();
    },

    loadSampleData() {
      this.conversations = [
        {
          id: 1,
          name: 'John Smith',
          avatar: '/assets/images/avatar-placeholder.svg',
          type: 'Customer',
          online: true,
          lastMessage: 'Thank you for the quick response!',
          lastMessageTime: '2m ago',
          lastSeen: '2m ago',
          unread: 2,
          messages: [
            {
              id: 1,
              text: 'Hi! I have a question about my recent order.',
              time: '10:30 AM',
              sent: false
            },
            {
              id: 2,
              text: 'Hello John! I\'d be happy to help you with your order. What seems to be the issue?',
              time: '10:32 AM',
              sent: true
            },
            {
              id: 3,
              text: 'I haven\'t received a tracking number yet, and it\'s been 3 days since I placed the order.',
              time: '10:33 AM',
              sent: false
            },
            {
              id: 4,
              text: 'Let me check that for you right away. Can you please provide your order number?',
              time: '10:35 AM',
              sent: true
            },
            {
              id: 5,
              text: 'Sure! It\'s ORD-2025-001',
              time: '10:36 AM',
              sent: false
            },
            {
              id: 6,
              text: 'Perfect! I can see your order here. It was shipped yesterday and the tracking number is TR123456789. You should receive an email with the details shortly.',
              time: '10:38 AM',
              sent: true
            },
            {
              id: 7,
              text: 'Thank you for the quick response!',
              time: '10:40 AM',
              sent: false
            },
            {
              id: 8,
              text: 'You\'re very welcome! Is there anything else I can help you with today?',
              time: '10:42 AM',
              sent: true
            },
            {
              id: 9,
              text: 'Actually, yes! I was wondering about the return policy for this product.',
              time: '10:45 AM',
              sent: false
            },
            {
              id: 10,
              text: 'Great question! You have 30 days from the delivery date to return any item for a full refund. The item just needs to be in its original condition.',
              time: '10:47 AM',
              sent: true
            },
            {
              id: 11,
              text: 'That\'s perfect. And what about exchanges?',
              time: '10:48 AM',
              sent: false
            },
            {
              id: 12,
              text: 'Exchanges follow the same 30-day policy. You can exchange for a different size, color, or even a completely different product of equal or lesser value.',
              time: '10:50 AM',
              sent: true
            },
            {
              id: 13,
              text: 'Excellent! You\'ve been incredibly helpful. I think I have everything I need now.',
              time: '10:52 AM',
              sent: false
            },
            {
              id: 14,
              text: 'I\'m so glad I could help! If you have any other questions in the future, please don\'t hesitate to reach out. Have a wonderful day! 😊',
              time: '10:54 AM',
              sent: true
            },
            {
              id: 15,
              text: 'You too! Thanks again for the excellent customer service.',
              time: '10:55 AM',
              sent: false
            }
          ]
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          avatar: '/assets/images/avatar-placeholder.svg',
          type: 'Team',
          online: true,
          lastMessage: 'The new dashboard looks great!',
          lastMessageTime: '1h ago',
          lastSeen: '45m ago',
          unread: 1,
          messages: [
            {
              id: 1,
              text: 'Hey! Can you review the new dashboard design when you get a chance?',
              time: '9:15 AM',
              sent: false
            },
            {
              id: 2,
              text: 'Absolutely! Let me take a look now.',
              time: '9:18 AM',
              sent: true
            },
            {
              id: 3,
              text: 'The new dashboard looks great! I love the updated charts and the clean layout.',
              time: '9:45 AM',
              sent: false
            }
          ]
        },
        {
          id: 3,
          name: 'Mike Davis',
          avatar: '/assets/images/avatar-placeholder.svg',
          type: 'Vendor',
          online: false,
          lastMessage: 'I\'ll get back to you with the pricing.',
          lastMessageTime: '3h ago',
          lastSeen: '2h ago',
          unread: 0,
          messages: [
            {
              id: 1,
              text: 'Hi Mike! We\'re looking to place a bulk order. Can you send us a quote?',
              time: '8:30 AM',
              sent: true
            },
            {
              id: 2,
              text: 'Sure thing! What quantities are you looking at?',
              time: '8:45 AM',
              sent: false
            },
            {
              id: 3,
              text: 'We need about 500 units of the premium package.',
              time: '8:47 AM',
              sent: true
            },
            {
              id: 4,
              text: 'I\'ll get back to you with the pricing.',
              time: '8:50 AM',
              sent: false
            }
          ]
        },
        {
          id: 4,
          name: 'Emily Brown',
          avatar: '/assets/images/avatar-placeholder.svg',
          type: 'Customer',
          online: false,
          lastMessage: 'Perfect, thanks!',
          lastMessageTime: '1d ago',
          lastSeen: '18h ago',
          unread: 0,
          messages: [
            {
              id: 1,
              text: 'Is there a way to cancel my subscription?',
              time: 'Yesterday 2:30 PM',
              sent: false
            },
            {
              id: 2,
              text: 'Yes, you can cancel anytime from your account settings. Would you like me to guide you through it?',
              time: 'Yesterday 2:35 PM',
              sent: true
            },
            {
              id: 3,
              text: 'That would be great, thank you!',
              time: 'Yesterday 2:36 PM',
              sent: false
            },
            {
              id: 4,
              text: 'Go to Settings > Billing > Cancel Subscription. You\'ll see a red button at the bottom.',
              time: 'Yesterday 2:37 PM',
              sent: true
            },
            {
              id: 5,
              text: 'Perfect, thanks!',
              time: 'Yesterday 2:40 PM',
              sent: false
            }
          ]
        },
        {
          id: 5,
          name: 'David Wilson',
          avatar: '/assets/images/avatar-placeholder.svg',
          type: 'Support',
          online: true,
          lastMessage: 'The issue has been resolved.',
          lastMessageTime: '2d ago',
          lastSeen: '1d ago',
          unread: 0,
          messages: [
            {
              id: 1,
              text: 'We\'ve received reports of slow loading times on the dashboard.',
              time: '2 days ago',
              sent: false
            },
            {
              id: 2,
              text: 'Thanks for reporting this. I\'ll investigate right away.',
              time: '2 days ago',
              sent: true
            },
            {
              id: 3,
              text: 'The issue has been resolved.',
              time: '2 days ago',
              sent: false
            }
          ]
        }
      ];
    },

    filterConversations() {
      if (!this.searchQuery.trim()) {
        this.filteredConversations = [...this.conversations];
      } else {
        const query = this.searchQuery.toLowerCase();
        this.filteredConversations = this.conversations.filter(conv =>
          conv.name.toLowerCase().includes(query) ||
          conv.lastMessage.toLowerCase().includes(query) ||
          conv.type.toLowerCase().includes(query)
        );
      }
    },

    selectConversation(conversation) {
      this.selectedConversation = conversation;
      this.currentMessages = [...conversation.messages];
      
      // Mark as read
      conversation.unread = 0;
      
      // Hide sidebar on mobile after selection
      if (window.innerWidth < 992) {
        this.sidebarVisible = false;
      }

      // Scroll to bottom of messages
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },

    sendMessage() {
      if (!this.newMessage.trim() || !this.selectedConversation) return;

      const message = {
        id: Date.now(),
        text: this.newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: true
      };

      // Add to current messages
      this.currentMessages.push(message);
      
      // Update conversation's last message
      this.selectedConversation.lastMessage = this.newMessage.trim();
      this.selectedConversation.lastMessageTime = 'now';
      
      // Update the conversation in the list
      const convIndex = this.conversations.findIndex(c => c.id === this.selectedConversation.id);
      if (convIndex !== -1) {
        this.conversations[convIndex].messages.push(message);
        this.conversations[convIndex].lastMessage = this.newMessage.trim();
        this.conversations[convIndex].lastMessageTime = 'now';
      }

      // Clear input
      this.newMessage = '';

      // Scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });

      // Simulate response after a delay
      this.simulateResponse();
    },

    simulateResponse() {
      if (!this.selectedConversation) return;

      // Show typing indicator
      this.isTyping = true;

      setTimeout(() => {
        this.isTyping = false;
        
        const responses = [
          "Thanks for your message!",
          "I'll look into that right away.",
          "Let me check that for you.",
          "That sounds good to me.",
          "I understand your concern.",
          "I'll get back to you shortly."
        ];

        const response = {
          id: Date.now(),
          text: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sent: false
        };

        this.currentMessages.push(response);
        this.selectedConversation.lastMessage = response.text;
        this.selectedConversation.lastMessageTime = 'now';

        // Update conversation in list
        const convIndex = this.conversations.findIndex(c => c.id === this.selectedConversation.id);
        if (convIndex !== -1) {
          this.conversations[convIndex].messages.push(response);
          this.conversations[convIndex].lastMessage = response.text;
          this.conversations[convIndex].lastMessageTime = 'now';
        }

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }, 1500 + Math.random() * 1000);
    },

    scrollToBottom() {
      const messagesContainer = document.getElementById('chatMessages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    },

    handleTyping() {
      // Simulate typing detection for other users
      console.log('User is typing...');
    },

    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 120);
      textarea.style.height = newHeight + 'px';
    },

    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },

    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },

    addEmoji(emoji) {
      this.newMessage += emoji;
      this.showEmojiPicker = false;
    },

    toggleAttachment() {
      this.showNotification('File attachment feature would open here', 'info');
    },

    markAllRead() {
      this.conversations.forEach(conv => {
        conv.unread = 0;
      });
      this.showNotification('All conversations marked as read', 'success');
    },

    newConversation() {
      this.showNotification('New conversation modal would open here', 'info');
    },

    videoCall() {
      this.showNotification('Video call would start here', 'info');
    },

    voiceCall() {
      this.showNotification('Voice call would start here', 'info');
    },

    muteConversation() {
      this.showNotification('Conversation muted', 'success');
    },

    archiveConversation() {
      if (this.selectedConversation) {
        this.showNotification(`${this.selectedConversation.name} archived`, 'success');
      }
    },

    deleteConversation() {
      if (this.selectedConversation && confirm(`Delete conversation with ${this.selectedConversation.name}?`)) {
        this.conversations = this.conversations.filter(c => c.id !== this.selectedConversation.id);
        this.filterConversations();
        this.selectedConversation = null;
        this.currentMessages = [];
        this.showNotification('Conversation deleted', 'success');
      }
    },

    simulateActivity() {
      // Randomly show online/offline status changes
      setInterval(() => {
        const randomConv = this.conversations[Math.floor(Math.random() * this.conversations.length)];
        if (Math.random() > 0.7) {
          randomConv.online = !randomConv.online;
        }
      }, 10000);

      // Occasionally add new messages from others
      setInterval(() => {
        if (Math.random() > 0.8) {
          const randomConv = this.conversations[Math.floor(Math.random() * this.conversations.length)];
          const newMessages = [
            "Hey, are you available?",
            "I have a quick question",
            "Thanks for your help earlier!",
            "Can we schedule a meeting?",
            "Just wanted to follow up"
          ];
          
          randomConv.unread += 1;
          randomConv.lastMessage = newMessages[Math.floor(Math.random() * newMessages.length)];
          randomConv.lastMessageTime = 'now';
        }
      }, 15000);
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
});