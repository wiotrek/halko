using System.Runtime.Serialization;

namespace Core.Enums
{
    public enum EUserRole
    {
        [EnumMember(Value = "Admin")]
        Admin,
        [EnumMember(Value = "Point")]
        Point
    }
}