App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load users.
    $.getJSON('../users.json', function(data) {
      var petsRow = $('#usersRow');
      var userTemplate = $('#userTemplate');

      for (i = 0; i < data.length; i ++) {
        userTemplate.find('.panel-title').text(data[i].name);
        userTemplate.find('img').attr('src', data[i].picture);
        userTemplate.find('.user-id').text(data[i].UserID);
        userTemplate.find('.user-premium').text(data[i].premium);
        userTemplate.find('.user-location').text(data[i].location);
        userTemplate.find('.btn-pay').attr('data-id', data[i].id);

        petsRow.append(userTemplate.html());
      }
    });

    // Load contracts
    $.getJSON('../contract.json', function(data) {
      var contractRow = $('#contractsRow');
      var contractTemplate = $('#contractTemplate');

      for (i = 0; i < data.length; i ++) {
        contractTemplate.find('.panel-title').text(data[i].policyName);
        contractTemplate.find('img').attr('src', data[i].picture);
        contractTemplate.find('.riskCovered').text(data[i].riskCovered);
        contractTemplate.find('.btn-order').attr('data-id', data[i].contractID);

        contractRow.append(contractTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-pay', App.handleAdopt);

    $(document).on('click', '.btn-createUser', App.handleCreatUser);
    $(document).on('click', '.btn-pay', App.handleAdopt);
    $(document).on('click', '.btn-user', App.usersTab);
    $(document).on('click', '.btn-contract', App.contractsTab);
  },

  usersTab: function(event){
    $('#usersRow').attr('style', 'display:block;');
    $('#contractsRow').attr('style', 'display:none;');
  },

  contractsTab: function(event){
    $('#usersRow').attr('style', 'display:none;');
    $('#contractsRow').attr('style', 'display:block;');
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },


  handleCreatUser: function(event) {
    event.preventDefault();

    var userId = parseInt($(event.target).data('id'));

    $.getJSON('User.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var userArtifact = data;
      App.contracts.User = TruffleContract(userArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
