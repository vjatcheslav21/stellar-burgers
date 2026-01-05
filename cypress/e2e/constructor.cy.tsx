describe('Интеграционные тесты на Cypress написаны для страницы конструктора бургера', function () {
  describe('Тест работы модальных окон', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4000');
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.viewport(1300, 800);
    });

    it('Тест открытия модального окна конкретного ингредиента', function () {
      const ingredientName = 'Соус традиционный галактический';
      const ingredientCalories = '99';
      cy.contains('[data-cy="ingredient"]', ingredientName).click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-ingredient-name"]').should(
        'contain',
        ingredientName
      );
      cy.get('[data-cy="modal-ingredient-calories"]').should(
        'contain',
        ingredientCalories
      );
    });

    it('Тест работы модального окна. Закрытие по клику на крестик', function () {
      const ingredientName = 'Соус традиционный галактический';
      cy.contains('[data-cy="ingredient"]', ingredientName).click();
      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('@modal').should('not.exist');
    });

    it('Тест работы модального окна. Закрытие по клику на оверлей', function () {
      const ingredientName = 'Соус традиционный галактический';
      cy.contains('[data-cy="ingredient"]', ingredientName).click();
      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4000');
      window.localStorage.setItem('refreshToken', 'fakeToken');
      cy.setCookie('accessToken', 'fakeToken');
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.viewport(1300, 800);
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    });

    it('Добавление ингредиента из списка в конструктор', function () {
      cy.get('[data-cy="constructor"]')
        .as('constructor')
        .contains('Выберите булки');
      cy.contains(
        '[data-cy="ingredient"]',
        'Биокотлета из марсианской Магнолии'
      ).within(() => {
        cy.contains('button', 'Добавить').click();
      });
      cy.get('@constructor').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
      cy.contains('[data-cy="ingredient"]', 'Краторная булка N-200i').within(
        () => {
          cy.contains('button', 'Добавить').click();
        }
      );
      cy.get('@constructor').should('contain', 'Краторная булка N-200i');
      cy.contains(
        '[data-cy="ingredient"]',
        'Соус традиционный галактический'
      ).within(() => {
        cy.contains('button', 'Добавить').click();
      });
      cy.get('@constructor').should(
        'contain',
        'Соус традиционный галактический'
      );
      cy.get('[data-cy="order-button"]').click();
      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '12345');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('@modal').should('not.exist');
      cy.get('@constructor').should('contain', 'Выберите булки');
      cy.get('@constructor').should('contain', 'Выберите начинку');
    });
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });
});
