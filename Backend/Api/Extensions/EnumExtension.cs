#nullable enable
using System;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;

namespace Api.Extensions
{
    public static class EnumExtension
    {
        /// <summary>
        /// Retrieve string value from EnumMember annotation
        /// </summary>
        /// <param name="value">The enum field declaration</param>
        /// <typeparam name="T">Enum type</typeparam>
        /// <returns>Message from EnumMember annotation</returns>
        public static string? GetnEnumMemberValue<T>( this T value ) where T : Enum
        {
            return typeof(T)
                .GetTypeInfo()
                .DeclaredMembers
                .SingleOrDefault ( x => x.Name == value.ToString() )
                ?.GetCustomAttribute<EnumMemberAttribute> ( false )
                ?.Value;
        }
    }
}