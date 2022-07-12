
class User {
  userId: String;
  emailId: String;
  phoneNumber: String;
  userGroups: Array<String>;
  constructor(
    userId: String,
    emailId: String,
    phoneNumber: String,
    userGroups: Array<String>
  ) {
    this.userId = userId;
    this.emailId = emailId;
    this.phoneNumber = phoneNumber;
    this.userGroups = userGroups;
  }
}

class UserOperations {
  listOfUser: Array<User>;
  constructor(){
    this.listOfUser = [];
   
  }
  createUser(user: User): void {
    this.listOfUser.push(user);
  }
  removeUser(user: User): void {
    this.listOfUser = this.listOfUser.filter(idx => idx.userId !== user.userId)
  }
  addGroupToUser(user: User, group: Group) {
    for (var i = 0; i < this.listOfUser.length; i++) {
      if (this.listOfUser[i].userId === user.userId) {
        this.listOfUser[i].userGroups.push(group.groupId);
        return;
      }
    }
  }
  getUserById(userId:String){
    return this.listOfUser.filter(idx => idx.userId === userId)[0]
  }
}

class Group {
  groupId: String;
  groupName: String;
  users: Array<String>;

  constructor(groupId: String, groupName: String, users: Array<String>) {
    this.groupId = groupId;
    this.groupName = groupName;
    this.users = users;
  }
}

class GroupOperations {
 
  listOfGroups: Array<Group>;
  
  constructor(){
    this.listOfGroups = [];
  }

  getGrouById(groupId:String){
    return this.listOfGroups.filter(idx => idx.groupId === groupId)[0]
  }

  createGroup(group: Group): void {
    this.listOfGroups.push(group);
  }
  removeGroup(group: Group): void {
    this.listOfGroups = this.listOfGroups.filter(idx => idx.groupId !== group.groupId)
  }
  addUserToGroup(user: User, group: Group) {
    for (var i = 0; i < this.listOfGroups.length; i++) {
      if (this.listOfGroups[i].groupId === group.groupId) {
        this.listOfGroups[i].users.push(user.userId);
        break;
      }
    }
  }
  removeUserFromGroup(user: User, group: Group) {
    for (var i = 0; i < this.listOfGroups.length; i++) {
      if (this.listOfGroups[i].groupId === group.groupId) {
        this.listOfGroups[i].users = this.listOfGroups[i].users.filter(idx => idx !== user.userId);
        break;
      }
    }
  }
}

enum ExpenseType {
  EQUAL,
  PERCENTAGE,
  EXACT,
  TypeNew,
}

class Expense {
  amount: Number;
  typeOfExpense: ExpenseType;
}

class ExpenseOperations {
  addExpense(
    owner: User,
    otherContributers: Array<String>,
    group: Group,
    totalPayable: Number,
    tr: Transaction
  ) {
    const payableAmount:Number = Number(totalPayable)/Number(otherContributers.length + 1);
    for (let index = 0; index < otherContributers.length; index++) {
      const element = otherContributers[index];
      tr.addTransaction(
        owner.userId,
        element,
        group.groupId,
        payableAmount,
        TransactionType.PENDING
      );
    }
  }

  // addPercentageExpense(owner:User,otherContributers:Array<User>,
  //     group:Group,totalPayable:Number,tr:Transaction){
  //     for (let index = 0; index < otherContributers.length; index++) {
  //         const element = otherContributers[index];
  //         tr.addTransaction(owner.userId,group.groupId,
  //             totalPayable,TransactionType.CREDIT)
  //     }

  // }

  //     case ExpenseType.EXACT :
  //     let payableAmount:Number = parseFloat(totalAmount/numOfContributer)
  //     for (let index = 0; index < otherContributers.length; index++) {
  //         const element = otherContributers[index];

  //         tr.addTransaction(owner.userId,group,
  //             payableAmount,TransactionType.CREDIT)
  //     }
  // break;

  // case ExpenseType.PERCENTAGE :
  // let payableAmount:Number = parseFloat(totalAmount/numOfContributer)
  // for (let index = 0; index < otherContributers.length; index++) {
  //     const element = otherContributers[index];

  //     tr.addTransaction(owner.userId,group,
  //         payableAmount,TransactionType.CREDIT)
  // }
  // clearDues(){

  // }
}

enum TransactionType {
  PENDING,
  RESOLVED,
}

class Transaction {
  allTransactions: Array<unknown>;

  constructor(){
    this.allTransactions = []
  }

  addTransaction(
    ownerId: String,
    userId: String,
    groupId: String,
    amount: Number,
    transactionType: TransactionType
  ): Number {
    this.allTransactions.push({
      ownerId,
      userId,
      groupId,
      amount,
      transactionType,
    });
    return this.allTransactions.length;
  }
  getAllTransactions(): Array<unknown> {
    return this.allTransactions;
  }

  getAllTransactionByGroupId(groupId:String):Array<unknown>{
    return this.allTransactions.filter(idx=> (idx as any).groupId == groupId )
  }

  showPayables(userId): Array<unknown> {
   return this.allTransactions.filter(idx=> (idx as any).userId == userId )
  }

  showReceivables(userId): Array<unknown> {
    return this.allTransactions.filter(idx=> (idx as any).ownerId == userId )
  }
}

class Splitwise {
  

  init() {
    let userOps = new UserOperations();
    let groupOps = new GroupOperations();


    userOps.createUser(new User("1", "ABC1", "9888881", []));
    userOps.createUser(new User("3", "ABC3", "9888883", []));
    userOps.createUser(new User("2", "ABC2", "9888882", []));
    userOps.createUser(new User("4", "ABC4", "9888884", []));
    userOps.createUser(new User("5", "ABC5", "9888885", []));



    // userOps.removeUser(userOps.listOfUser[3]);


    

    groupOps.createGroup(new Group("13", "Group13", []));
    groupOps.createGroup(new Group("14", "Group14", []));
    groupOps.createGroup(new Group("15", "Group15", []));
    groupOps.createGroup(new Group("16", "Group16", []));


    // groupOps.removeGroup(groupOps.listOfGroups[2]);
    
    // console.log('listOfGroup',groupOps.listOfGroups);

    groupOps.addUserToGroup(userOps.listOfUser[1], groupOps.listOfGroups[2]);
    groupOps.addUserToGroup(userOps.listOfUser[2], groupOps.listOfGroups[2]);
    groupOps.addUserToGroup(userOps.listOfUser[3], groupOps.listOfGroups[2]);

    userOps.addGroupToUser(userOps.listOfUser[1], groupOps.listOfGroups[2]);
    userOps.addGroupToUser(userOps.listOfUser[2], groupOps.listOfGroups[2]);
    userOps.addGroupToUser(userOps.listOfUser[3], groupOps.listOfGroups[2]);
    
    groupOps.addUserToGroup(userOps.getUserById('2'), groupOps.getGrouById('16'));
    userOps.addGroupToUser(userOps.getUserById('2'), groupOps.getGrouById('16'));


    groupOps.addUserToGroup(userOps.getUserById('3'), groupOps.getGrouById('16'));
    userOps.addGroupToUser(userOps.getUserById('3'), groupOps.getGrouById('16'));
    groupOps.addUserToGroup(userOps.getUserById('1'), groupOps.getGrouById('16'));
    userOps.addGroupToUser(userOps.getUserById('1'), groupOps.getGrouById('16'));



    groupOps.addUserToGroup(userOps.getUserById('3'), groupOps.getGrouById('14'));
    userOps.addGroupToUser(userOps.getUserById('3'), groupOps.getGrouById('14'));





    // groupOps.addUserToGroup(userOps.listOfUser[4], groupOps.listOfGroups[2]);

    // console.log('listOfGroup',groupOps.listOfGroups);

    // console.log('listOfUser',userOps.listOfUser);


    groupOps.removeUserFromGroup(userOps.listOfUser[1], groupOps.listOfGroups[2]);

    let tr = new Transaction();

    let expOps = new ExpenseOperations();

    let groupOfUsers = [userOps.listOfUser[0].userId, userOps.listOfUser[2].userId,userOps.listOfUser[1].userId,userOps.listOfUser[3].userId];
    expOps.addExpense(
      userOps.listOfUser[0],
      groupOfUsers,
      groupOps.listOfGroups[1],
      140,
      tr
    );



    expOps.addExpense(
      userOps.getUserById('5'),
      groupOps.getGrouById('15').users,
      groupOps.getGrouById('15'),
      900,
      tr
    );


    expOps.addExpense(
      userOps.getUserById('2'),
      groupOps.getGrouById('15').users,
      groupOps.getGrouById('15'),
      90,
      tr
    );




    expOps.addExpense(
      userOps.getUserById('3'),
      groupOps.getGrouById('15').users,
      groupOps.getGrouById('15'),
      120,
      tr
    );


    expOps.addExpense(
      userOps.getUserById('2'),
      groupOps.getGrouById('16').users,
      groupOps.getGrouById('16'),
      100,
      tr
    );


    expOps.addExpense(
      userOps.getUserById('2'),
      groupOps.getGrouById('16').users,
      groupOps.getGrouById('16'),
      23,
      tr
    );





    // expOps.clearDues()


    console.log(tr.getAllTransactions());

    // //view Only
    console.log(tr.showPayables(userOps.getUserById('1').userId));
    console.log(tr.showReceivables(userOps.getUserById('1').userId));
    console.log(tr.showPayables(userOps.getUserById('2').userId));
    console.log(tr.showReceivables(userOps.getUserById('2').userId));
    console.log(tr.showPayables(userOps.getUserById('3').userId));
    console.log(tr.showReceivables(userOps.getUserById('3').userId));
    console.log(tr.getAllTransactionByGroupId('15'));
    console.log(tr.showPayables(userOps.getUserById('4').userId));
    console.log(tr.showReceivables(userOps.getUserById('4').userId));
    console.log(tr.getAllTransactionByGroupId('15'))

    console.log(groupOps.getGrouById('15'))


    groupOps.removeUserFromGroup(userOps.getUserById('2'),groupOps.getGrouById('16'))

    console.log(groupOps.getGrouById('16'))
  }
}

new Splitwise().init()
