using Api.Extensions;
using Core.Enums;

namespace Api.Errors
{
    /// <summary>
    /// The response for all Web API calls made
    /// </summary>
    public class ApiResponse
    {
        #region Public Properties

        /// <summary>
        /// The HTTP status code
        /// </summary>
        public short StatusCode { get; set; }

        /// <summary>
        /// The error message for a failes API call
        /// </summary>
        public string Message { get; set; }
        
        #endregion
        
        #region Constructor

        public ApiResponse( short statusCode, string errorMessage = null )
        {
            StatusCode = statusCode;
            Message = errorMessage ?? GetDefaultMessageForStatusCode ( statusCode );
        }
        
        public ApiResponse( short statusCode, EServiceResponse serviceResponse )
        {
            StatusCode = statusCode;
            Message = serviceResponse.GetnEnumMemberValue();
        }

        #endregion
        
        #region Private Methods

        private static string GetDefaultMessageForStatusCode( short statusCode )
        {
            return statusCode switch
            {
                400 => "Złe lub nie kompletne dane",
                401 => "Brak autoryzacji",
                404 => "Nie znaleziono zasobu",
                500 => "Wystąpił problem z serwerem",
                _ => null
            };
        }
        
        #endregion
    }
}