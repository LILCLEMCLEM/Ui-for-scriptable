// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: calendar-check;

const UI = importModule("DynamicUI");
const ui = new UI();

const data = {
  state: {
    tasks: [
      { id: 1, company: "@coinbase", text: "design user registration process", time: "50 min", completed: false, priority: "high", period: "morning" },
      { id: 2, company: "@apple", text: "review and provide feedback on the wireframes for the new design concept", time: "45 min", completed: false, priority: "medium", period: "morning" },
      { id: 3, company: "@shopify", text: "mood board for the ecommerce template", time: "30 min", completed: false, priority: "low", period: "morning" },
      { id: 4, company: "@apple", text: "finalize color palette and typography", time: "25 min", completed: false, priority: "medium", period: "afternoon" },
      { id: 5, company: "@insurance", text: "analyze user feedback and suggest improvements", time: "60 min", completed: false, priority: "high", period: "afternoon" },
      { id: 6, company: "@shopify", text: "evaluate two potential website layouts", time: "45 min", completed: false, priority: "medium", period: "evening" },
      { id: 7, company: "@coinbase", text: "identify user pain points in current flow", time: "45 min", completed: false, priority: "low", period: "evening" }
    ],
    newTask: "",
    selectedCompany: "@coinbase",
    selectedPriority: "medium",
    selectedPeriod: "morning",
    estimatedTime: "30 min",
    currentDate: new Date().toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    nextId: 8,
    filter: "all" // all, morning, afternoon, evening
  },
  
  methods: {
    addTask: function(event) {
      if (state.newTask.trim()) {
        const newTaskObj = {
          id: state.nextId,
          company: state.selectedCompany,
          text: state.newTask.trim(),
          time: state.estimatedTime,
          completed: false,
          priority: state.selectedPriority,
          period: state.selectedPeriod
        };
        addToArray('tasks', newTaskObj);
        setState('newTask', '');
        setState('nextId', state.nextId + 1);
      }
    },
    
    toggleTask: function(event) {
      const id = parseInt(event.target.dataset.id);
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        const updatedTask = { ...state.tasks[taskIndex], completed: !state.tasks[taskIndex].completed };
        updateArrayItem('tasks', taskIndex, updatedTask);
      }
    },
    
    deleteTask: function(event) {
      const id = parseInt(event.target.dataset.id);
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        removeFromArray('tasks', taskIndex);
      }
    },
    
    updateNewTask: function(event) {
      setState('newTask', event.target.value);
    },
    
    updateCompany: function(event) {
      setState('selectedCompany', event.target.value);
    },
    
    updatePriority: function(event) {
      setState('selectedPriority', event.target.value);
    },
    
    updatePeriod: function(event) {
      setState('selectedPeriod', event.target.value);
    },
    
    updateTime: function(event) {
      setState('estimatedTime', event.target.value);
    },
    
    setFilter: function(event) {
      setState('filter', event.target.dataset.filter);
    },
    
    clearCompleted: function(event) {
      const activeTasks = state.tasks.filter(task => !task.completed);
      setState('tasks', activeTasks);
    }
  },

  html: {
    type: "div",
    props: {
      style: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: "#f8f9fa",
        minHeight: "100vh",
        margin: "0",
        padding: "0"
      }
    },
    children: [
      // Container principal mobile
      {
        type: "div",
        props: {
          style: {
            maxWidth: "400px",
            margin: "0 auto",
            background: "white",
            minHeight: "100vh",
            boxShadow: "0 0 30px rgba(0,0,0,0.1)",
            position: "relative"
          }
        },
        children: [
          // Header avec gradient et stats
          {
            type: "div",
            props: {
              style: {
                padding: "60px 24px 24px 24px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden"
              }
            },
            children: [
              // Decoration circle
              {
                type: "div",
                props: {
                  style: {
                    position: "absolute",
                    top: "-50%",
                    right: "-20%",
                    width: "200px",
                    height: "200px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "50%"
                  }
                }
              },
              
              // Title
              {
                type: "h1",
                props: {
                  innerText: "today",
                  style: {
                    fontSize: "2rem",
                    fontWeight: "700",
                    marginBottom: "8px",
                    position: "relative",
                    zIndex: "2"
                  }
                }
              },
              
              // Stats
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    position: "relative",
                    zIndex: "2"
                  }
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: {
                        textAlign: "center",
                        flex: "1"
                      }
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          id: "totalTasks",
                          style: {
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            display: "block"
                          }
                        }
                      },
                      {
                        type: "div",
                        props: {
                          innerText: "tasks",
                          style: {
                            fontSize: "0.8rem",
                            opacity: "0.8",
                            marginTop: "4px"
                          }
                        }
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        textAlign: "center",
                        flex: "1"
                      }
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          id: "totalTime",
                          style: {
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            display: "block"
                          }
                        }
                      },
                      {
                        type: "div",
                        props: {
                          innerText: "of 7.5 hrs",
                          style: {
                            fontSize: "0.8rem",
                            opacity: "0.8",
                            marginTop: "4px"
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              
              // Calendar week
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "24px 0 16px 0",
                    position: "relative",
                    zIndex: "2"
                  }
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: {
                        textAlign: "center",
                        flex: "1",
                        padding: "8px 4px",
                        borderRadius: "12px",
                        transition: "all 0.3s ease"
                      }
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          innerText: "Mon",
                          style: {
                            fontSize: "0.75rem",
                            opacity: "0.8",
                            marginBottom: "4px"
                          }
                        }
                      },
                      {
                        type: "div",
                        props: {
                          innerText: "12",
                          style: {
                            fontSize: "1rem",
                            fontWeight: "600"
                          }
                        }
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        textAlign: "center",
                        flex: "1",
                        padding: "8px 4px",
                        borderRadius: "12px",
                        transition: "all 0.3s ease"
                      }
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          innerText: "Tue",
                          style: {
                            fontSize: "0.75rem",
                            opacity: "0.8",
                            marginBottom: "4px"
                          }
                        }
                      },
                      {
                        type: "div",
                        props: {
                          innerText: "13",
                          style: {
                            fontSize: "1rem",
                            fontWeight: "600"
                          }
                        }
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        textAlign: "center",
                        flex: "1",
                        padding: "8px 4px",
                        borderRadius: "12px",
                        transition: "all 0.3s ease"
                      }
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          innerText: "Wed",
                          style: {
                            fontSize: "0.75rem",
                            opacity: "0.8",
                            marginBottom: "4px"
                          }
                        }
                      },
                      {
                        type: "div",
                        props: {
                          innerText: "14",
                          style: {
                            fontSize: "1rem",
                            fontWeight: "600"
                          }
                        }
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        textAlign: "center",
                        flex: "1",
                        padding: "8px 4px",
                        borderRadius: "12px",
                        transition: "all 0.3s ease"
                      }
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          innerText: "Thu",
                          style: {
                            fontSize: "0.75rem",
                            opacity: "0.8",
                            marginBottom: "4px"
                          }
                        }
                      },
                      {
                        type: "div",
                        props: {
                          innerText: "15",
                          style: {
                            fontSize: "1rem",
                            fontWeight: "600"
                          }
                        }
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        textAlign: "center",
                        flex: "1",
                        padding: "8px 4px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.2)",
                        transform: "scale(1.05)",
                        transition: "all 0.3s ease"
                      }
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          innerText: "Fri",
                          style: {
                            fontSize: "0.75rem",
                            opacity: "0.8",
                            marginBottom: "4px"
                          }
                        }
                      },
                      {
                        type: "div",
                        props: {
                          innerText: "16",
                          style: {
                            fontSize: "1rem",
                            fontWeight: "600"
                          }
                        }
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        textAlign: "center",
                        flex: "1",
                        padding: "8px 4px",
                        borderRadius: "12px",
                        transition: "all 0.3s ease"
                      }
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          innerText: "Sat",
                          style: {
                            fontSize: "0.75rem",
                            opacity: "0.8",
                            marginBottom: "4px"
                          }
                        }
                      },
                      {
                        type: "div",
                        props: {
                          innerText: "17",
                          style: {
                            fontSize: "1rem",
                            fontWeight: "600"
                          }
                        }
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        textAlign: "center",
                        flex: "1",
                        padding: "8px 4px",
                        borderRadius: "12px",
                        transition: "all 0.3s ease"
                      }
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          innerText: "Sun",
                          style: {
                            fontSize: "0.75rem",
                            opacity: "0.8",
                            marginBottom: "4px"
                          }
                        }
                      },
                      {
                        type: "div",
                        props: {
                          innerText: "18",
                          style: {
                            fontSize: "1rem",
                            fontWeight: "600"
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          
          // Content area
          {
            type: "div",
            props: {
              style: {
                padding: "24px"
              }
            },
            children: [
              // Add task form
              {
                type: "div",
                props: {
                  style: {
                    background: "#f8f9fa",
                    borderRadius: "16px",
                    padding: "20px",
                    marginBottom: "24px"
                  }
                },
                children: [
                  {
                    type: "input",
                    props: {
                      type: "text",
                      placeholder: "Add new task...",
                      valueBind: "newTask",
                      oninput: "updateNewTask",
                      style: {
                        width: "85%",
                        padding: "12px 16px",
                        border: "1px solid #dadce0",
                        borderRadius: "8px",
                        fontSize: "16px",
                        marginBottom: "12px",
                        outline: "none"
                      }
                    }
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        gap: "8px",
                        marginBottom: "12px"
                      }
                    },
                    children: [
                      {
                        type: "select",
                        props: {
                          valueBind: "selectedCompany",
                          oninput: "updateCompany",
                          style: {
                            flex: "1",
                            padding: "8px 12px",
                            border: "1px solid #dadce0",
                            borderRadius: "6px",
                            fontSize: "14px"
                          }
                        },
                        children: [
                          {
                            type: "option",
                            props: {
                              innerText: "@coinbase"
                            }
                          },
                          {
                            type: "option",
                            props: {
                              innerText: "@apple"
                            }
                          },
                          {
                            type: "option",
                            props: {
                              innerText: "@shopify"
                            }
                          },
                          {
                            type: "option",
                            props: {
                              innerText: "@insurance"
                            }
                          }
                        ]
                      },
                      {
                        type: "select",
                        props: {
                          valueBind: "selectedPeriod",
                          oninput: "updatePeriod",
                          style: {
                            flex: "1",
                            padding: "8px 12px",
                            border: "1px solid #dadce0",
                            borderRadius: "6px",
                            fontSize: "14px"
                            
                          }
                        },
                        children: [
                          {
                            type: "option",
                            props: {
                              innerText: "morning"
                            }
                          },
                          {
                            type: "option",
                            props: {
                              innerText: "afternoon"
                            }
                          },
                          {
                            type: "option",
                            props: {
                              innerText: "evening"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: "button",
                    props: {
                      innerText: "Add Task",
                      onclick: "addTask",
                      style: {
                        width: "100%",
                        padding: "12px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }
                    }
                  }
                ]
              },
              
              // Filters
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    gap: "8px",
                    marginBottom: "24px",
                    width: "100%",
                    overflow: "scroll"
                  }
                },
                children: [
                  {
                    type: "button",
                    props: {
                      innerText: "All",
                      onclick: "setFilter",
                      dataset: { filter: "all" },
                      style: {
                        padding: "8px 16px",
                        borderRadius: "20px",
                        border: "1px solid #dadce0",
                        background: "#667eea",
                        color: "white",
                        fontSize: "14px",
                        cursor: "pointer"
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      innerText: "Morning",
                      onclick: "setFilter",
                      dataset: { filter: "morning" },
                      style: {
                        padding: "8px 16px",
                        borderRadius: "20px",
                        border: "1px solid #dadce0",
                        background: "transparent",
                        color: "#5f6368",
                        fontSize: "14px",
                        cursor: "pointer"
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      innerText: "Afternoon",
                      onclick: "setFilter",
                      dataset: { filter: "afternoon" },
                      style: {
                        padding: "8px 16px",
                        borderRadius: "20px",
                        border: "1px solid #dadce0",
                        background: "transparent",
                        color: "#5f6368",
                        fontSize: "14px",
                        cursor: "pointer"
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      innerText: "Evening",
                      onclick: "setFilter",
                      dataset: { filter: "evening" },
                      style: {
                        padding: "8px 16px",
                        borderRadius: "20px",
                        border: "1px solid #dadce0",
                        background: "transparent",
                        color: "#5f6368",
                        fontSize: "14px",
                        cursor: "pointer"
                      }
                    }
                  }
                ]
              },
              
              // Tasks container
              {
                type: "div",
                props: {
                  id: "taskContainer"
                }
              }
            ]
          }
        ]
      }
    ]
  }
};

// Script externe pour la logique avancée
const externalScript = `
<style>
  select option {
    padding: 8px;
  }
  
  .task-item {
    display: flex;
    align-items: flex-start;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 16px;
    margin-bottom: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
    border-left: 4px solid transparent;
  }
  
  .task-item:hover {
    background: #e8f0fe;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .task-item.completed {
    opacity: 0.6;
    background: #f1f3f4;
  }
  
  .task-item.completed .task-text {
    text-decoration: line-through;
  }
  
  .task-item.priority-high {
    border-left-color: #ea4335;
  }
  
  .task-item.priority-medium {
    border-left-color: #fbbc04;
  }
  
  .task-item.priority-low {
    border-left-color: #34a853;
  }
  
  .task-checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid #dadce0;
    border-radius: 50%;
    margin-right: 16px;
    margin-top: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    flex-shrink: 0;
    cursor: pointer;
  }
  
  .task-checkbox.checked {
    background: #34a853;
    border-color: #34a853;
    color: white;
    font-size: 12px;
  }
  
  .task-content {
    flex: 1;
  }
  
  .task-header {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  
  .task-company {
    font-weight: 600;
    color: #5f6368;
    margin-right: 8px;
  }
  
  .task-time {
    font-size: 0.9rem;
    color: #9aa0a6;
    margin-left: auto;
  }
  
  .task-text {
    color: #1a1a1a;
    line-height: 1.4;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    margin: 24px 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #f1f3f4;
  }
  
  .section-icon {
    font-size: 1.2rem;
    margin-right: 12px;
  }
  
  .section-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #5f6368;
    flex: 1;
    text-transform: capitalize;
  }
  
  .delete-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: #fef2f2;
    color: #ef4444;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    margin-left: 12px;
    transition: all 0.3s ease;
  }
  
  .delete-btn:hover {
    background: #ef4444;
    color: white;
    transform: scale(1.1);
  }
</style>

<script>
// Templates pour les tâches
window.templates = {
  taskItem: function(task, index) {
    const div = document.createElement('div');
    div.className = \`task-item priority-\${task.priority} \${task.completed ? 'completed' : ''}\`;
    
    // Checkbox
    const checkbox = document.createElement('div');
    checkbox.className = \`task-checkbox \${task.completed ? 'checked' : ''}\`;
    checkbox.dataset.id = task.id;
    checkbox.addEventListener('click', methods.toggleTask);
    if (task.completed) {
      checkbox.innerHTML = '✓';
    }
    
    // Content
    const content = document.createElement('div');
    content.className = 'task-content';
    
    const header = document.createElement('div');
    header.className = 'task-header';
    
    const company = document.createElement('span');
    company.className = 'task-company';
    company.textContent = task.company;
    
    const time = document.createElement('span');
    time.className = 'task-time';
    time.textContent = task.time;
    
    const text = document.createElement('div');
    text.className = 'task-text';
    text.textContent = task.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.dataset.id = task.id;
    deleteBtn.addEventListener('click', methods.deleteTask);
    
    header.appendChild(company);
    header.appendChild(time);
    
    content.appendChild(header);
    content.appendChild(text);
    
    div.appendChild(checkbox);
    div.appendChild(content);
    div.appendChild(deleteBtn);
    
    return div;
  },
  
  sectionHeader: function(title, icon) {
    const div = document.createElement('div');
    div.className = 'section-header';
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'section-icon';
    iconSpan.textContent = icon;
    
    const titleSpan = document.createElement('span');
    titleSpan.className = 'section-title';
    titleSpan.textContent = title;
    
    div.appendChild(iconSpan);
    div.appendChild(titleSpan);
    
    return div;
  }
};

// Fonction refresh améliorée
const originalRefresh = window.refresh;
window.refresh = function() {
  originalRefresh();
  
  const container = document.getElementById('taskContainer');
  const totalTasks = document.getElementById('totalTasks');
  const totalTime = document.getElementById('totalTime');
  
  if (container && state.tasks) {
    // Filtrer les tâches
    let filteredTasks = state.tasks;
    if (state.filter !== 'all') {
      filteredTasks = state.tasks.filter(task => task.period === state.filter);
    }
    
    // Grouper par période
    const periods = ['morning', 'afternoon', 'evening'];
    const icons = { morning: '🌅', afternoon: '☀️', evening: '🌙' };
    
    container.innerHTML = '';
    
    periods.forEach(period => {
      const periodTasks = filteredTasks.filter(task => task.period === period);
      if (periodTasks.length > 0) {
        const header = templates.sectionHeader(period, icons[period]);
        container.appendChild(header);
        
        periodTasks.forEach((task, index) => {
          const taskElement = templates.taskItem(task, index);
          container.appendChild(taskElement);
        });
      }
    });
    
    // Mettre à jour les stats
    const totalCount = state.tasks.length;
    const totalMinutes = state.tasks.reduce((total, task) => {
      const minutes = parseInt(task.time.split(' ')[0]) || 0;
      return total + minutes;
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    
    totalTasks.textContent = totalCount;
    totalTime.textContent = hours > 0 ? \`\${hours}.\${Math.round(remainingMinutes/6)}\` : \`\${remainingMinutes}m\`;
    
    // Mettre à jour les boutons de filtre
    document.querySelectorAll('[data-filter]').forEach(btn => {
      if (btn.dataset.filter === state.filter) {
        btn.style.background = '#667eea';
        btn.style.color = 'white';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = '#5f6368';
      }
    });
  }
};

// Ajouter le support pour Enter
document.addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector('input[data-valuebind="newTask"]');
  if (input) {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        methods.addTask(e);
      }
    });
  }
});
</script>
`;

ui.render(data, externalScript);
Script.complete();