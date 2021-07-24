using System.Threading.Tasks;
using Core.Entities.Halko;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;

namespace Api.Extensions
{
    /// <summary>
    /// Is fired only if the application is first time running or identity table is empty
    /// </summary>
    public static class InitializeDataExtensions
    {
        #region Public Methods
        
        /// <summary>
        /// Execute methods to create first user with roles to using application
        /// </summary>
        public static async Task FirstUsingApplicationAsync(
            RoleManager<IdentityRole> roleManager, 
            UserManager<AppUser> userManager,
            IUnitOfWork unitOfWork)
        {
            await CreateRolesAsync(roleManager);
            await CreateUserAsync(userManager);
            await CreateTransactionTypesAsync ( unitOfWork );
            await CreateProductCategoriesAsync ( unitOfWork );
            await CreateDeviceStates ( unitOfWork );
        }
        
        #endregion

        #region Private Methods
        
        /// <summary>
        /// Initialize AspNetRoles table in identity database with roles
        /// </summary>
        private static async Task CreateRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            IdentityRole[] roleIdentities =
            {
                new() {Name = "Admin"},
                new() {Name = "Point"}
            };

            foreach ( var roleIdentity in roleIdentities )
                await roleManager.CreateAsync ( roleIdentity );
        }

        /// <summary>
        /// Initialize AspNetUsers table in identity database with administrator user
        /// </summary>
        private static async Task CreateUserAsync(UserManager<AppUser> userManager)
        {
            var appUser = new AppUser
            {
                UserName = "Admin"
            };
            
            await  userManager.CreateAsync ( appUser, "1w2q3e" );
            await userManager.AddToRoleAsync ( appUser, "Admin" );
        }

        private static async Task CreateTransactionTypesAsync( IUnitOfWork unitOfWork )
        {
            var transactionTypes = new TransactionType[]
            {
                new() { Type = "Sprzedaż"},
                new() { Type = "Zakup"}
            };

            foreach ( var transactionType in transactionTypes )
            {
                var transactionSpec = new TransactionTypesSpecification ( transactionType.Type );
                var transaction = await unitOfWork.Repository<TransactionType>().GetEntityWithSpecAsync ( transactionSpec );
                if (transaction != null) continue;

                unitOfWork.Repository<TransactionType>().Add ( transactionType );
            }

            await unitOfWork.CompleteAsync();
        }
        
        private static async Task CreateProductCategoriesAsync( IUnitOfWork unitOfWork )
        {
            var productCategories = new ProductCategory[]
            {
                new() {Category = "akcesoria", TransactionTypeId = 1},
                new() {Category = "telefon", TransactionTypeId = 1},
                new() {Category = "serwis", TransactionTypeId = 1},
                new() {Category = "paczka", TransactionTypeId = 2},
                new() {Category = "zwrot", TransactionTypeId = 2},
                new() {Category = "telefon", TransactionTypeId = 2},
                new() {Category = "zaliczka", TransactionTypeId = 2},
            };

            foreach ( var productCategory in productCategories )
            {
                var productSpec = new ProductCategoriesSpecification ( 
                    productCategory.Category, 
                    productCategory.TransactionTypeId 
                );
                var product = await unitOfWork.Repository<ProductCategory>().GetEntityWithSpecAsync ( productSpec );
                if( product != null ) continue;
                
                unitOfWork.Repository<ProductCategory>().Add ( productCategory );
            }

            await unitOfWork.CompleteAsync();
        }

        public static async Task CreateDeviceStates(IUnitOfWork unitOfWork)
        {
            var deviceStates = new DeviceState[]
            {
                new() {State = "Nowy"},
                new() {State = "Używany"}
            };

            foreach ( var deviceState in deviceStates )
            {
                var stateSpec = new DeviceStateSpecification ( deviceState.State );
                var state = await unitOfWork.Repository<DeviceState>().GetEntityWithSpecAsync ( stateSpec );
                if( state != null ) continue;

                unitOfWork.Repository<DeviceState>().Add ( deviceState );
            }

            await unitOfWork.CompleteAsync();
        }
        
        #endregion
    }
}