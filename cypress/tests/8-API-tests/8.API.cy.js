describe('Bank account API test', () => {

    before(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3001/login',
            body: {
                type: 'LOGIN',
                username: 'stefko',
                password: 'Spira123'
            }
        }).then(response => {
            expect(response.status).to.eq(200);
        });
    });

    it('GET Bank accounts', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3001/graphql',
            body: {
                query: `
                    query {
                        listBankAccount {
                            id
                            bankName
                            routingNumber
                            accountNumber
                        }
                    }
                `
            }
        }).then(response => {

            expect(response.status).to.eq(200);
            expect(response.body.data.listBankAccount).to.not.be.null;

            const bankAccounts = response.body.data.listBankAccount;
            bankAccounts.forEach(account => {
                expect(account).to.have.property('id').that.is.a('string');
                expect(account).to.have.property('bankName').that.is.a('string');
                expect(account).to.have.property('routingNumber').that.is.a('string');
                expect(account).to.have.property('accountNumber').that.is.a('string');
            });
        });
    });
});