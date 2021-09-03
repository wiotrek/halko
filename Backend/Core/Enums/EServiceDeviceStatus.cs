using System.Runtime.Serialization;

namespace Core.Enums
{
    public enum EServiceDeviceStatus
    {
        [EnumMember(Value = "serwisowany")]
        OnService,
        [EnumMember(Value = "Zwrócony do klienta")]
        ReturnedToClient
    }
}