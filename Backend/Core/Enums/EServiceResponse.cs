using System.Runtime.Serialization;

namespace Core.Enums
{
    /// <summary>
    /// Interpret return value from services to specific message for ApiResponse
    /// Positive numbers - Success operation, negative otherwise
    /// Device: 100 - 199
    /// Participant: 200 - 299
    /// Point: 300 - 399
    /// Transaction: 400 - 499
    /// Others: 500+
    /// </summary>
    public enum EServiceResponse
    {
        /// <summary>
        /// Default value
        /// </summary>
        None = 0,
        
        #region Device Messages
        
        [EnumMember(Value = "Nie możliwa operacja - nie istnieje taki stan urządzenia")]
        StateNotExist = -100,
        [EnumMember(Value = "Urządzenie zostało pomyślnie dodane")]
        DeviceCreateSuccess = 101,
        [EnumMember(Value = "Urządzenie nie zostało dodane")]
        DeviceCreateFailed = -101,
        [EnumMember(Value = "Nie możliwa operacja - urządzenie zostało sprzedane")]
        DeviceWasSold = -102,
        [EnumMember(Value = "Urządzenie pomyślnie sprzedano")]
        DeviceSold = 103,
        [EnumMember(Value = "Urządzenie nie zostało sprzedane")]
        DeviceNotSold = -103,
        [EnumMember(Value = "Urządzenie pomyślnie przeniesiono do innego punktu")]
        DeviceMoveSuccess = 104,
        [EnumMember(Value = "Urządzenie nie zostało przeniesione")]
        DeviceMoveFailed = -104,
        [EnumMember(Value = "Urządzenie jest już w tym punkcie")]
        DeviceIsInThisPoint = -105,
        [EnumMember(Value = "Urządzenie nie istnieje")]
        DeviceNotExist = -106,
        [EnumMember(Value = "Urządzenie nie zostało zaktualizowane")]
        DeviceEditFailed = -107,
        [EnumMember(Value = "Urządzenie nie zostało przyjęte do serwisu")]
        DeviceServiceCreateFailed = -108,
        
        #endregion
        
        #region Point Messages
        
        [EnumMember(Value = "Punkt nie istnieje")]
        PointNotExist = -300,
        
        #endregion
        
        #region Participant Messages
        
        [EnumMember(Value = "Pracownik punktu istnieje")]
        ParticipantExist = -200,
        [EnumMember(Value = "Pracownik został pomyślnie dodany do punktu")]
        ParticipantCreateSuccess = 201,
        [EnumMember(Value = "Pracownik nie został dodany")]
        ParticipantCreateFailed = -201,
        [EnumMember(Value = "Pracownik został wcześniej usunięty")]
        ParticipantWasDeleted = -202,
        [EnumMember(Value = "Pracownik którego próbujesz usunąć nie istnieje")]
        ParticipantNotExistWhileDelete = -203,
        [EnumMember(Value = "Pracownik został pomyślnie usunięty z punktu")]
        ParticipantDeletedSuccess = 204,
        [EnumMember(Value = "Pracownik nie został usunięty")]
        ParticipantDeletedFailed = -204,
        [EnumMember(Value = "Pracownik punktu nie istnieje")]
        ParticipantNotExist = -205,
        
        #endregion
        
        #region Transaction Messages
        
        [EnumMember(Value = "Rodzaj sprzedawanego produktu nie istnieje")]
        ProductCategoryNotExist = -400,
        [EnumMember(Value = "Transakcja została dokonana")]
        TransactionCreateSuccess = 401,
        [EnumMember(Value = "Transakcja została odrzucona")]
        TransactionCreateFailed = -401,
        [EnumMember(Value = "Brak nazwy produktu")]
        ProductEmpty = -402,
        [EnumMember(Value = "Cena transakcji nie może być ujemna (lub równa 0)")]
        PriceBelowZero = -403,
        [EnumMember(Value = "Transakcja nie istnieje")]
        TransactionNotExist = -404,
        [EnumMember(Value = "Transakcja została usunięta pomyślnie")]
        TransactionDeleteSuccess = 405,
        [EnumMember(Value = "Transakcja nie została usunięta")]
        TransactionDeleteFailed = -405,
        
        #endregion
        
        #region Others
        
        [EnumMember(Value = "Pracownik lub punkt nie istnieje")]
        ParticipantOrStateNotExist = -500
        
        #endregion
    }
}