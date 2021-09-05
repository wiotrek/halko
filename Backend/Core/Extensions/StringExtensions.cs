using System.Linq;

namespace Core.Extensions
{
    public static class StringExtensions
    {
        public static string FirstLetterToUpper( this string input )
        {
            return string.IsNullOrEmpty ( input )
                ? string.Empty
                : string.Concat ( input.Select ( ( currentChar, index ) =>
                    index == 0 
                        ? char.ToUpper ( currentChar ) 
                        : currentChar ) );
        }
    }
}