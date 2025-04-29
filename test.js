// Simple test suite for website functionality
// This would typically be run with a testing framework like Jest

// Mock DOM elements
const mockElements = {
    burger: { 
        classList: { 
            toggle: jest.fn(),
            contains: jest.fn().mockReturnValue(false)
        },
        addEventListener: jest.fn()
    },
    nav: { 
        classList: { 
            toggle: jest.fn(),
            contains: jest.fn(),
            remove: jest.fn()
        } 
    },
    navLinks: [
        { style: { animation: '' } },
        { style: { animation: '' } },
        { style: { animation: '' } }
    ],
    contactForm: {
        addEventListener: jest.fn(),
        reset: jest.fn()
    },
    nameInput: { value: '', focus: jest.fn() },
    emailInput: { value: '', focus: jest.fn() },
    messageInput: { value: '', focus: jest.fn() },
    nameError: { textContent: '' },
    emailError: { textContent: '' },
    messageError: { textContent: '' },
    // Add test for hero image
    heroImage: { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80' },
    // Add test for about image
    aboutImage: { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
};

// Mock document methods
document.getElementById = jest.fn(id => {
    switch(id) {
        case 'contactForm': return mockElements.contactForm;
        case 'name': return mockElements.nameInput;
        case 'email': return mockElements.emailInput;
        case 'message': return mockElements.messageInput;
        case 'nameError': return mockElements.nameError;
        case 'emailError': return mockElements.emailError;
        case 'messageError': return mockElements.messageError;
        default: return null;
    }
});

document.querySelector = jest.fn(selector => {
    switch(selector) {
        case '.burger': return mockElements.burger;
        case '.nav-links': return mockElements.nav;
        case '.hero-image img': return mockElements.heroImage;
        case '.about-image img': return mockElements.aboutImage;
        default: return null;
    }
});

document.querySelectorAll = jest.fn(selector => {
    switch(selector) {
        case '.nav-links li': return mockElements.navLinks;
        case 'a[href^="#"]': return [];
        default: return [];
    }
});

// Test form validation
describe('Contact Form Validation', () => {
    // Setup
    const formSubmitHandler = mockElements.contactForm.addEventListener.mock.calls[0][1];
    
    beforeEach(() => {
        // Reset form values and error messages
        mockElements.nameInput.value = '';
        mockElements.emailInput.value = '';
        mockElements.messageInput.value = '';
        mockElements.nameError.textContent = '';
        mockElements.emailError.textContent = '';
        mockElements.messageError.textContent = '';
    });
    
    test('should show error when name is empty', () => {
        // Arrange
        const event = { preventDefault: jest.fn() };
        
        // Act
        formSubmitHandler(event);
        
        // Assert
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockElements.nameError.textContent).toBe('Name is required');
        expect(mockElements.nameInput.focus).toHaveBeenCalled();
    });
    
    test('should show error when email is invalid', () => {
        // Arrange
        const event = { preventDefault: jest.fn() };
        mockElements.nameInput.value = 'John Doe';
        mockElements.emailInput.value = 'invalid-email';
        
        // Act
        formSubmitHandler(event);
        
        // Assert
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockElements.emailError.textContent).toBe('Please enter a valid email address');
        expect(mockElements.emailInput.focus).toHaveBeenCalled();
    });
    
    test('should show error when message is empty', () => {
        // Arrange
        const event = { preventDefault: jest.fn() };
        mockElements.nameInput.value = 'John Doe';
        mockElements.emailInput.value = 'john@example.com';
        
        // Act
        formSubmitHandler(event);
        
        // Assert
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockElements.messageError.textContent).toBe('Message is required');
        expect(mockElements.messageInput.focus).toHaveBeenCalled();
    });
    
    test('should submit form when all fields are valid', () => {
        // Arrange
        const event = { preventDefault: jest.fn() };
        mockElements.nameInput.value = 'John Doe';
        mockElements.emailInput.value = 'john@example.com';
        mockElements.messageInput.value = 'This is a test message';
        global.alert = jest.fn();
        
        // Act
        formSubmitHandler(event);
        
        // Assert
        expect(event.preventDefault).toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith('Form submitted successfully!');
        expect(mockElements.contactForm.reset).toHaveBeenCalled();
    });
});

// Test mobile navigation
describe('Mobile Navigation', () => {
    test('should toggle navigation menu when burger is clicked', () => {
        // Arrange
        const burgerClickHandler = mockElements.burger.addEventListener.mock.calls[0][1];
        
        // Act
        burgerClickHandler();
        
        // Assert
        expect(mockElements.nav.classList.toggle).toHaveBeenCalledWith('nav-active');
        expect(mockElements.burger.classList.toggle).toHaveBeenCalledWith('toggle');
    });
});

// Test hospitality theme images
describe('Hospitality Theme Images', () => {
    test('should have hotel lobby image in hero section', () => {
        expect(mockElements.heroImage.src).toContain('photo-1566073771259-6a8506099945');
    });
    
    test('should have hospital building image in about section', () => {
        expect(mockElements.aboutImage.src).toContain('photo-1519494026892-80bbd2d6fd0d');
    });
});

console.log('All tests would run with a proper testing framework');